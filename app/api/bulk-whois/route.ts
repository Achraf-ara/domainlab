import { NextResponse } from "next/server"
import { whoisLookup } from "@/lib/providers/whois"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "bulk-whois")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const body = await req.json().catch(() => null)
  const domains: string[] = Array.isArray(body?.domains) ? body.domains : []
  if (!domains.length) return NextResponse.json({ error: "domains array required" }, { status: 400 })
  const results = await Promise.allSettled(domains.map((d) => whoisLookup(d)))
  const normalized = results.map((r, i) =>
    r.status === "fulfilled" ? { domain: domains[i], ...r.value } : { domain: domains[i], error: String(r.reason) },
  )
  return NextResponse.json({ results: normalized })
}
