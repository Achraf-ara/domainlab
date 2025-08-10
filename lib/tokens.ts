import crypto from "crypto"
import { getDb } from "@/lib/mongodb"

export function generateToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url")
}

export async function createMagicToken(email: string, ttlMinutes = 15) {
  const db = await getDb()
  if (!db) throw new Error("Database not configured")
  const token = generateToken()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + ttlMinutes * 60 * 1000)
  await db.collection("magicTokens").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
  await db.collection("magicTokens").insertOne({
    token,
    email: email.toLowerCase(),
    createdAt: now,
    expiresAt,
    used: false,
  })
  return { token, expiresAt }
}

export async function verifyMagicToken(token: string) {
  const db = await getDb()
  if (!db) throw new Error("Database not configured")
  const doc = await db.collection("magicTokens").findOne({ token })
  if (!doc) throw new Error("Invalid token")
  if (doc.used) throw new Error("Token already used")
  if (doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) throw new Error("Token expired")
  await db.collection("magicTokens").updateOne({ token }, { $set: { used: true, usedAt: new Date() } })
  return { email: doc.email as string }
}
