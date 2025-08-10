import { ENV } from "@/lib/env"

export type ExpiredItem = {
  domain: string
  dropDate: string
  traffic?: number
  backlinks?: number
  age?: number
  priceGuide?: number
  tags?: string[]
}

export async function fetchExpired(query: string): Promise<ExpiredItem[]> {
  if (!ENV.EXPIRED_API_URL || !ENV.EXPIRED_API_KEY) {
    throw new Error("Expired provider not configured. Set EXPIRED_API_URL and EXPIRED_API_KEY.")
  }
  const url = `${ENV.EXPIRED_API_URL}?q=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${ENV.EXPIRED_API_KEY}`, Accept: "application/json" },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`Expired provider error: ${res.status}`)
  const data = await res.json()
  // Normalize: expect array of {domain, dropDate, metrics...}
  const arr = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : []
  return arr.map((x: any) => ({
    domain: x.domain,
    dropDate: x.dropDate || x.drop_time || x.drop || new Date().toISOString().slice(0, 10),
    traffic: x.traffic ?? undefined,
    backlinks: x.backlinks ?? undefined,
    age: x.age ?? undefined,
    priceGuide: x.priceGuide ?? x.price ?? undefined,
    tags: x.tags ?? [],
  }))
}
