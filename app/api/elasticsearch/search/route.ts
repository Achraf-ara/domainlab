import { NextResponse } from "next/server"
import { getESClient } from "@/lib/elasticsearch"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim()
  const page = Math.max(1, Number(searchParams.get("page") || 1))
  const size = Math.min(50, Math.max(1, Number(searchParams.get("size") || 12)))
  const from = (page - 1) * size
  const tlds = (searchParams.get("tlds") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const tags = (searchParams.get("tags") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  try {
    const { client, index } = getESClient()
    const must: any[] = []
    if (q) {
      must.push({
        multi_match: {
          query: q,
          fields: ["domain^3", "tags^1"],
          type: "best_fields",
          fuzziness: "AUTO",
        },
      })
    }
    if (tlds.length) {
      must.push({ terms: { tld: tlds } })
    }
    if (tags.length) {
      must.push({ terms: { tags } })
    }

    const res = await client.search({
      index,
      from,
      size,
      query: must.length ? { bool: { must } } : { match_all: {} },
      sort: [{ updatedAt: { order: "desc" } }],
    })

    const hits = (res.hits.hits || []).map((h: any) => ({ id: h._id, ...(h._source || {}) }))
    const total = typeof res.hits.total === "number" ? res.hits.total : res.hits.total?.value || hits.length
    return NextResponse.json({ hits, total, page, size })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Elasticsearch error" }, { status: 500 })
  }
}
