import { NextResponse } from "next/server"
import { getESClient, type DomainIndexRecord } from "@/lib/elasticsearch"

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || ""
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : ""
  const expected = process.env.ES_INDEX_TOKEN
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let payload: { items: Partial<DomainIndexRecord>[] } | null = null
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
  const items = Array.isArray(payload?.items) ? payload!.items : []
  if (!items.length) return NextResponse.json({ error: "items array required" }, { status: 400 })

  try {
    const { client, index } = getESClient()

    // Optional: create index with a simple mapping if it doesn't exist
    const exists = await client.indices.exists({ index })
    if (!exists) {
      await client.indices.create({
        index,
        body: {
          mappings: {
            properties: {
              domain: { type: "text" },
              tld: { type: "keyword" },
              tags: { type: "keyword" },
              traffic: { type: "integer" },
              backlinks: { type: "integer" },
              age: { type: "integer" },
              price: { type: "integer" },
              available: { type: "boolean" },
              updatedAt: { type: "date" },
            },
          },
        },
      })
    }

    const now = new Date().toISOString()
    const body: any[] = []
    for (const it of items) {
      const id = it.id || it.domain
      body.push({ index: { _index: index, _id: id } })
      body.push({
        domain: it.domain,
        tld: it.tld || "." + String(it.domain?.split(".").slice(1).join(".")),
        tags: it.tags || [],
        traffic: typeof it.traffic === "number" ? it.traffic : undefined,
        backlinks: typeof it.backlinks === "number" ? it.backlinks : undefined,
        age: typeof it.age === "number" ? it.age : undefined,
        price: typeof it.price === "number" ? it.price : undefined,
        available: typeof it.available === "boolean" ? it.available : undefined,
        updatedAt: now,
      })
    }

    const res = await client.bulk({ refresh: "wait_for", operations: body as any })
    if (res.errors) {
      const items = (res.items || []).slice(0, 3)
      return NextResponse.json({ error: "Bulk index had errors", sample: items }, { status: 500 })
    }
    return NextResponse.json({ success: true, indexed: payload!.items.length })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Elasticsearch error" }, { status: 500 })
  }
}
