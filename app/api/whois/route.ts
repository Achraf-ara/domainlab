import { NextResponse } from "next/server"
import { ipFromRequest } from "@/utils/ipFromRequest"
import { rateLimit } from "@/utils/rateLimit"
import { getDb } from "@/utils/db"
import { whoisLookup } from "@/utils/whoisLookup"

export async function GET(req: Request) {
  try {
    const ip = ipFromRequest(req)
    const rl = await rateLimit(ip, "whois")
    if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

    const { searchParams } = new URL(req.url)
    const domain = searchParams.get("domain") || ""
    if (!domain || !/^[a-z0-9-]+\.[a-z]{2,}$/i.test(domain)) {
      return NextResponse.json({ error: "Valid domain required" }, { status: 400 })
    }

    const db = await getDb()
    if (db) {
      const cached = await db.collection("cachedWhois").findOne({ domain, expiresAt: { $gt: new Date() } })
      if (cached) {
        return NextResponse.json({ domain, ...cached.data, source: "cache" })
      }
    }

    const data = await whoisLookup(domain)

    if (db) {
      await db.collection("cachedWhois").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
      await db.collection("cachedWhois").updateOne(
        { domain },
        {
          $set: {
            domain,
            data,
            fetchedAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        },
        { upsert: true },
      )
    }

    return NextResponse.json({ domain, ...data })
  } catch (error: any) {
    console.error("Unhandled error in /api/whois:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
