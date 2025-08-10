import { ENV } from "./env"
import { getDb } from "./mongodb"

export async function rateLimit(ip: string, route: string) {
  const db = await getDb()
  if (!db) return { allowed: true, remaining: ENV.RATE_LIMIT_MAX } // if no DB, skip
  const now = new Date()
  const windowMs = ENV.RATE_LIMIT_WINDOW_S * 1000
  const key = `${route}:${ip}`
  const expiresAt = new Date(now.getTime() + windowMs)

  const entry = await db.collection("ratelimits").findOneAndUpdate(
    { key },
    {
      $inc: { count: 1 },
      $setOnInsert: { key, createdAt: now },
      $set: { expiresAt },
    },
    { upsert: true, returnDocument: "after" },
  )
  await db.collection("ratelimits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })

  const count = entry?.count || 1
  const remaining = Math.max(0, ENV.RATE_LIMIT_MAX - count)
  return { allowed: count <= ENV.RATE_LIMIT_MAX, remaining }
}

export function ipFromRequest(req: Request) {
  const fwd = req.headers.get("x-forwarded-for") || ""
  return fwd.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "0.0.0.0"
}
