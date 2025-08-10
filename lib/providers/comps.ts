import { ENV } from "@/lib/env"

// Fetch domain comps/valuation from EstiBot API.
// Returns the count of comps if available, else 0.
export async function fetchComps(domainOrKeyword: string): Promise<number> {
  if (!ENV.ESTIBOT_API_KEY) {
    // No EstiBot API key — return 0 to allow fallback valuation
    return 0
  }
  const url = `https://api.estibot.com/v4/domain/estimate?domain=${encodeURIComponent(domainOrKeyword)}&key=${ENV.ESTIBOT_API_KEY}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
  if (!res.ok) {
    throw new Error(`EstiBot API error: ${res.status} ${res.statusText}`)
  }
  const data = await res.json()
  // EstiBot returns comps count under data.sales or data.comps or similar — adjust if needed
  // Here assuming 'data.sales' is an array of comps
  const count = Array.isArray(data.sales) ? data.sales.length : 0
  return count
}
