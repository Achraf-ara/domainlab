import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ENV } from "@/lib/env"
import bcrypt from "bcryptjs"
import { createSessionCookie } from "@/lib/auth"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "signup")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  if (!ENV.MONGODB_URI) return NextResponse.json({ error: "DB not configured" }, { status: 501 })
  const db = await getDb()
  const body = await req.json().catch(() => null)
  const email = String(body?.email || "")
    .toLowerCase()
    .trim()
  const password = String(body?.password || "")
  if (!email || !password) return NextResponse.json({ error: "email and password required" }, { status: 400 })

  const existing = await db!.collection("users").findOne({ email })
  if (existing) return NextResponse.json({ error: "Email already registered" }, { status: 409 })

  const passwordHash = await bcrypt.hash(password, 10)
  const res = await db!.collection("users").insertOne({
    email,
    passwordHash,
    oauthProvider: null,
    createdAt: new Date(),
    preferences: { tlds: [], alerts: [] },
  })
  await createSessionCookie({ uid: String(res.insertedId), email })
  return NextResponse.json({ success: true })
}
