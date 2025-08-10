import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { createMagicToken } from "@/lib/tokens"
import { sendMagicLinkEmail } from "@/lib/email"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "magic-link")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const body = await req.json().catch(() => null)
  const email = String(body?.email || "")
    .toLowerCase()
    .trim()
  const redirect = String(body?.redirect || "/account")

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email not configured. Set RESEND_API_KEY." }, { status: 501 })
  }
  if (!process.env.APP_URL) {
    return NextResponse.json({ error: "APP_URL missing for link generation" }, { status: 501 })
  }
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "Database not configured" }, { status: 501 })
  }

  const db = await getDb()
  // Optional: throttle per email
  await db!.collection("auditLogs").insertOne({
    type: "magic_link_request",
    email,
    ip,
    createdAt: new Date(),
  })

  const { token } = await createMagicToken(email, 15)
  const link = `${process.env.APP_URL}/api/auth/verify?token=${encodeURIComponent(token)}&redirect=${encodeURIComponent(
    redirect,
  )}`

  await sendMagicLinkEmail({
    to: email,
    link,
    from: process.env.EMAIL_FROM || "NamePurse <no-reply@example.com>",
  })

  return NextResponse.json({ success: true })
}
