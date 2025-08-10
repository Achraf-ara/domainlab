import { NextResponse } from "next/server"
import { fetchExpired } from "@/lib/providers/expired"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"
import { CACHE_HEADERS } from "@/lib/cache-headers"

// Mock expired domains data for when provider is not configured
const mockExpiredDomains = [
  {
    domain: "solarpulse.com",
    dropDate: "2024-08-15",
    traffic: 42000,
    backlinks: 5500,
    age: 5,
    priceGuide: 2399,
    tags: ["brandable", "trend", "energy"],
  },
  {
    domain: "quantgrid.io",
    dropDate: "2024-08-16",
    traffic: 18000,
    backlinks: 3400,
    age: 3,
    priceGuide: 1499,
    tags: ["keyword", "tech"],
  },
  {
    domain: "pixelforge.ai",
    dropDate: "2024-08-17",
    traffic: 32000,
    backlinks: 9900,
    age: 2,
    priceGuide: 2999,
    tags: ["brandable", "ai", "tech"],
  },
  {
    domain: "zenatlas.dev",
    dropDate: "2024-08-18",
    traffic: 8000,
    backlinks: 900,
    age: 1,
    priceGuide: 399,
    tags: ["brandable", "dev"],
  },
  {
    domain: "cryptovault.net",
    dropDate: "2024-08-19",
    traffic: 25000,
    backlinks: 4200,
    age: 4,
    priceGuide: 1899,
    tags: ["keyword", "crypto", "finance"],
  },
  {
    domain: "greentech.org",
    dropDate: "2024-08-20",
    traffic: 15000,
    backlinks: 2800,
    age: 6,
    priceGuide: 1299,
    tags: ["keyword", "green", "tech"],
  },
  {
    domain: "mindfulapp.com",
    dropDate: "2024-08-21",
    traffic: 12000,
    backlinks: 1500,
    age: 2,
    priceGuide: 899,
    tags: ["brandable", "health", "app"],
  },
  {
    domain: "datastream.co",
    dropDate: "2024-08-22",
    traffic: 35000,
    backlinks: 6700,
    age: 3,
    priceGuide: 2199,
    tags: ["keyword", "data", "tech"],
  },
]

export async function GET(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "expired")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("query") || "").toLowerCase()

  try {
    // Try to fetch from real provider first
    const results = await fetchExpired(q)
    return NextResponse.json({ results, source: "provider" }, { headers: CACHE_HEADERS.api })
  } catch (error) {
    // Fallback to mock data when provider is not configured
    console.log("Expired provider not configured, using mock data")

    // Filter mock data based on query
    let filteredResults = mockExpiredDomains
    if (q) {
      filteredResults = mockExpiredDomains.filter(
        (domain) => domain.domain.toLowerCase().includes(q) || domain.tags.some((tag) => tag.toLowerCase().includes(q)),
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
}
