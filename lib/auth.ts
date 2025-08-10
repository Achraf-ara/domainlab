import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { ENV } from "./env"

const COOKIE_NAME = "dl_session"
const alg = "HS256"

function getSecret() {
  if (!ENV.JWT_SECRET) throw new Error("JWT_SECRET missing")
  return new TextEncoder().encode(ENV.JWT_SECRET)
}

export type Session = {
  uid: string
  email: string
}

export async function createSessionCookie(session: Session, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const token = await new SignJWT(session as any)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(`${maxAgeSeconds}s`)
    .sign(getSecret())
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: maxAgeSeconds,
  })
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME)
}

export async function getSession(): Promise<Session | null> {
  const c = cookies().get(COOKIE_NAME)?.value
  if (!c) return null
  try {
    const { payload } = await jwtVerify(c, getSecret())
    if (!payload?.uid || !payload?.email) return null
    return { uid: String(payload.uid), email: String(payload.email) }
  } catch {
    return null
  }
}

export function toObjectId(uid: string) {
  try {
    return new ObjectId(uid)
  } catch {
    return null
  }
}
