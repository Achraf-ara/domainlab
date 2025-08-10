import { NextResponse } from "next/server"
import { verifyMagicToken } from "@/lib/tokens"
import { getDb } from "@/lib/mongodb"
import { createSessionCookie } from "@/lib/auth"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token") || ""
  const redirect = url.searchParams.get("redirect") || "/account"

  if (!token) return NextResponse.redirect(new URL("/auth/login?error=missing_token", url.origin))
  if (!process.env.MONGODB_URI) {
    return NextResponse.redirect(new URL("/auth/login?error=db_not_configured", url.origin))
  }

  try {
    const { email } = await verifyMagicToken(token)
    const db = await getDb()
    let user = await db!.collection("users").findOne({ email })
    if (!user) {
      const res = await db!.collection("users").insertOne({
        email,
        passwordHash: null,
        oauthProvider: null,
        createdAt: new Date(),
        preferences: { tlds: [], alerts: [] },
      })
      user = { _id: res.insertedId, email }
    }
    await createSessionCookie({ uid: String(user._id), email })
    return NextResponse.redirect(new URL(redirect, url.origin))
  } catch (e) {
    return NextResponse.redirect(new URL("/auth/login?error=invalid_or_expired", url.origin))
  }
}
