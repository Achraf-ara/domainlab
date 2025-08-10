import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { ENV } from "@/lib/env"

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!ENV.MONGODB_URI) return NextResponse.json({ error: "DB not configured" }, { status: 501 })
  const db = await getDb()
  const uid = session.uid
  const [user, portfolios, valuations, savedSearches, alerts, auditLogs] = await Promise.all([
    db!
      .collection("users")
      .findOne({ _id: (db as any)!.client!.bson.ObjectId?.(uid) })
      .catch(() => null),
    db!
      .collection("portfolios")
      .find({ userId: uid })
      .toArray()
      .catch(() => []),
    db!
      .collection("valuations")
      .find({ userId: uid })
      .toArray()
      .catch(() => []),
    db!
      .collection("savedSearches")
      .find({ userId: uid })
      .toArray()
      .catch(() => []),
    db!
      .collection("alerts")
      .find({ userId: uid })
      .toArray()
      .catch(() => []),
    db!
      .collection("auditLogs")
      .find({ userId: uid })
      .toArray()
      .catch(() => []),
  ])
  return NextResponse.json({ user, portfolios, valuations, savedSearches, alerts, auditLogs })
}
