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
  await Promise.all([
    db!.collection("portfolios").deleteMany({ userId: uid }),
    db!.collection("valuations").deleteMany({ userId: uid }),
    db!.collection("savedSearches").deleteMany({ userId: uid }),
    db!.collection("alerts").deleteMany({ userId: uid }),
    db!.collection("auditLogs").deleteMany({ userId: uid }),
    db!
      .collection("users")
      .deleteOne({ _id: (db as any)!.client!.bson.ObjectId?.(uid) })
      .catch(() => null),
  ])
  return NextResponse.json({ success: true })
}
