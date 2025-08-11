import { NextResponse } from "next/server"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"
import { fetchExpired } from "@/lib/providers/expired"
import { mockExpiredDomains } from "@/lib/mock-data"
import { CACHE_HEADERS } from "@/lib/cache-headers"
import { ENV } from "@/lib/env"

export async function GET(req: Request) {
  try {
    const ip = ipFromRequest(req)
    const rl = await rateLimit(ip, "expired")
    if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

    if (!ENV.APIFY_API_TOKEN) {
      console.warn("APIFY_API_TOKEN is not set. Falling back to mock data for /api/expired.")
      const { searchParams } = new URL(req.url)
      const q = (searchParams.get("query") || "").toLowerCase()
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
          note: "Using sample data. Configure APIFY_API_TOKEN for real data.",
        },
        { headers: CACHE_HEADERS.api },
      )
    }

    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("query") || "").toLowerCase()

    try {
      const results = await fetchExpired(q)
      return NextResponse.json({ results, source: "provider" }, { headers: CACHE_HEADERS.api })
    } catch (error: any) {
      console.error("Expired provider error, falling back to mock data:", error.message, error.stack)
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
          note: "Using sample data. Configure APIFY_API_TOKEN for real data.",
        },
        { headers: CACHE_HEADERS.api },
      )
    }
  } catch (error: any) {
    console.error("Unhandled error in /api/expired:", error.message, error.stack)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
