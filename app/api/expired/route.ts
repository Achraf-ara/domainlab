import { NextResponse } from "next/server"
import { fetchExpired } from "@/lib/providers/expired"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function GET(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "expired")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("query") || "").toLowerCase()
  try {
    const results = await fetchExpired(q)
    return NextResponse.json({ results, source: "provider" })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Expired provider error" }, { status: 501 })
  }
}
