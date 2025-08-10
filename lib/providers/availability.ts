import { ENV } from "@/lib/env"

export type AvailabilityResult = {
  domain: string
  available: boolean
  status: string
  price?: number
}

export async function domainrStatus(domains: string[]): Promise<AvailabilityResult[]> {
  if (!ENV.DOMAINR_CLIENT_ID) throw new Error("DOMAINR_CLIENT_ID missing. Add your RapidAPI Application Key.")
  // Domainr Status API via RapidAPI
  const url = `https://domainr.p.rapidapi.com/v2/status?domain=${encodeURIComponent(domains.join(","))}`
  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": ENV.DOMAINR_CLIENT_ID, // Use the RapidAPI Application Key here
      "X-RapidAPI-Host": "domainr.p.rapidapi.com", // Required for RapidAPI
    },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Domainr error: ${res.status} - ${await res.text()}`)
  const json = await res.json()
  const statuses = (json?.status || []) as Array<{ domain: string; status: string }>
  return statuses.map((s) => ({
    domain: s.domain,
    status: s.status,
    available: /inactive|undelegated|available/.test(s.status),
  }))
}

// Optional: GoDaddy suggested price (very rough; availability requires separate endpoints)
export async function godaddyPriceQuote(domain: string) {
  if (!ENV.GODADDY_API_KEY || !ENV.GODADDY_API_SECRET) return undefined
  // GoDaddy API: domains/available or pricing endpoints; here we use /v1/domains/suggest as a proxy for price hints if needed
  const url = `https://api.godaddy.com/v1/domains/available?domain=${encodeURIComponent(domain)}`
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `sso-key ${ENV.GODADDY_API_KEY}:${ENV.GODADDY_API_SECRET}`,
    },
    cache: "no-store",
  })
  if (!res.ok) return undefined
  const data = await res.json().catch(() => null)
  // API returns {available, price, currency, definitive} when allowed; normalize
  const price = typeof data?.price === "number" ? Math.round(data.price / 100) : undefined
  return price
}
