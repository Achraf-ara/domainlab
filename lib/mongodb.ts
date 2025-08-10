import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI
let client: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db | null> {
  if (!uri) return null
  if (cachedDb) return cachedDb
  client = new MongoClient(uri)
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || "domainlab")
  cachedDb = db
  return db
}
