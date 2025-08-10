import { ENV } from "@/lib/env"

// NameBio note: you must provide your licensed endpoint details in NAMEBIO_API_URL or set a proxy route.
// The following function expects a POST/GET to your licensed endpoint and normalizes results.
export async function fetchComps(domainOrKeyword: string): Promise<number> {
  if (ENV.NAMEBIO_KEY && ENV.NAMEBIO_API_URL) {
    const res = await fetch(`${ENV.NAMEBIO_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.NAMEBIO_KEY}`,
      },
      body: JSON.stringify({ query: domainOrKeyword, limit: 50 }),
    })
    if (!res.ok) throw new Error(`NameBio error: ${res.status}`)
    const data = await res.json()
    const count = Array.isArray(data?.sales) ? data.sales.length : Number(data?.count || 0)
    return count
  }
  // If you don't have NameBio, we cannot query comps; return 0 and let valuation proceed.
  throw new Error("NAMEBIO credentials missing")
}
