import { NextResponse } from "next/server"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"
import { fetchExpired } from "@/lib/providers/expired"
import { mockExpiredDomains } from "@/lib/mock-data"
import { CACHE_HEADERS } from "@/lib/cache-headers"

export async function GET(req: Request) {
  try {
    const ip = ipFromRequest(req)
    const rl = await rateLimit(ip, "expired")
    if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("query") || "").toLowerCase()

    try {
      const results = await fetchExpired(q)
      return NextResponse.json({ results, source: "provider" }, { headers: CACHE_HEADERS.api })
    } catch (error) {
      console.error("Expired provider error, falling back to mock data:", error)
      let filteredResults = mockExpiredDomains
      if (q) {
        filteredResults = mockExpiredDomains.filter(
          (domain) =>
            domain.domain.toLowerCase().includes(q) || domain.tags.some((tag) => tag.toLowerCase().includes(q)),
        )
      }
      return NextResponse.json(
        {
          results: filteredResults,
          source: "mock",
          note: "Using sample data. Configure EXPIRED_API_URL and EXPIRED_API_KEY for real data.",
        },
        { headers: CACHE_HEADERS.api },
      )
    }
  } catch (error: any) {
    console.error("Unhandled error in /api/expired:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
