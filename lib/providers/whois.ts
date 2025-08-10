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
  if (!ENV.WHOIS_API_KEY) {
    throw new Error("WHOIS_API_KEY missing. Add it in Vercel env to enable real WHOIS.")
  }
  // WhoisXML API
  const url = `${ENV.WHOIS_API_URL}?apiKey=${encodeURIComponent(
    ENV.WHOIS_API_KEY,
  )}&domainName=${encodeURIComponent(domain)}&outputFormat=JSON`
  const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" })
  if (!res.ok) throw new Error(`WHOIS provider error: ${res.status}`)
  const data = await res.json()
  const rec = data?.WhoisRecord
  const registered = !!rec?.dataError || !!rec?.registryData || !!rec?.createdDate || !!rec?.registrarName
  return {
    registered,
    registrar: rec?.registrarName || rec?.registrarIanaId,
    creationDate: rec?.createdDateNormalized || rec?.createdDate,
    expiryDate: rec?.expiresDateNormalized || rec?.expiresDate,
    rawWhois: rec?.rawText,
    source: "whoisxml",
  }
}
