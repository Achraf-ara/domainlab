import { ENV } from "@/lib/env"

export type WhoisSnapshot = {
  registered: boolean
  registrar?: string
  creationDate?: string
  expiryDate?: string
  rawWhois?: string
  source: string
}

export async function whoisLookup(domain: string): Promise<WhoisSnapshot> {
  if (!ENV.IP2WHOIS_API_KEY) {
    throw new Error("IP2WHOIS_API_KEY missing. Add it in Vercel env to enable real WHOIS.")
  }
  // IP2WHOIS API
  const url = `${ENV.IP2WHOIS_API_URL}?key=${encodeURIComponent(
    ENV.IP2WHOIS_API_KEY,
  )}&domain=${encodeURIComponent(domain)}`
  const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" })
  if (!res.ok) throw new Error(`IP2WHOIS provider error: ${res.status} - ${await res.text()}`)
  const data = await res.json()

  // IP2WHOIS response structure:
  // {
  //   "domain": "example.com",
  //   "domain_id": "...",
  //   "status": "registered", // or "available"
  //   "create_date": "YYYY-MM-DD HH:MM:SS",
  //   "update_date": "YYYY-MM-DD HH:MM:SS",
  //   "expire_date": "YYYY-MM-DD HH:MM:SS",
  //   "domain_age": "...",
  //   "whois_server": "...",
  //   "registrar": { "iana_id": "...", "name": "...", "url": "..." },
  //   "registrant": { ... },
  //   "admin": { ... },
  //   "tech": { ... },
  //   "nameservers": [ ... ],
  //   "whois_raw": "..."
  // }

  const registered = data.status === "registered"
  return {
    registered,
    registrar: data.registrar?.name || undefined,
    creationDate: data.create_date || undefined,
    expiryDate: data.expire_date || undefined,
    rawWhois: data.whois_raw || undefined,
    source: "ip2whois",
  }
}
