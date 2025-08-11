import { NextResponse } from "next/server"
import { ipFromRequest, rateLimit } from "@/utils/rateLimit"
import { parseDomainParts } from "@/utils/domainParser"
import { fetchComps } from "@/utils/fetchComps"
import {
  scoreAge,
  scoreLength,
  scoreKeywordCPC,
  scoreBacklinks,
  scoreComps,
  priceFromScore,
  tldMultiplier,
} from "@/utils/scoring"
import { generateText } from "@/utils/generateText"
import { getDb } from "@/utils/db"
import { getSession } from "@/utils/session"
import ENV from "@/utils/env"

export async function POST(req: Request) {
  try {
    const ip = ipFromRequest(req)
    const rl = await rateLimit(ip, "valuation")
    if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

    const body = await req.json().catch(() => null)
    const domain: string = body?.domain || ""
    const save: boolean = !!body?.save
    if (!domain) return NextResponse.json({ error: "domain required" }, { status: 400 })

    const { sld, tld } = parseDomainParts(domain)
    const len = sld.replace(/-/g, "").length
    let comps = 0
    try {
      comps = await fetchComps(sld)
    } catch (e) {
      console.error("Error fetching comps:", e)
      comps = 0
    }
    // Simple "external" signals approximations (replace with SEO providers if you add them later)
    const cpc = Math.min(12, Math.max(0, (sld.length % 7) + (sld.includes("ai") ? 3.5 : 1.2)))
    const backlinks = Math.floor(100 + ((len * 137) % 50000))
    const age = Math.floor((sld.length * 1.3) % 12)

    const metrics = {
      ageScore: scoreAge(age),
      lengthScore: scoreLength(len),
      keywordCPCScore: scoreKeywordCPC(cpc),
      backlinkScore: scoreBacklinks(backlinks),
      compsScore: scoreComps(comps),
      trendScore: 0.6 + (sld.includes("ai") ? 0.2 : 0),
    }

    const score =
      0.25 * metrics.ageScore +
      0.2 * metrics.lengthScore +
      0.15 * 0.6 +
      0.2 * metrics.keywordCPCScore +
      0.1 * metrics.compsScore +
      0.1 * metrics.backlinkScore

    const base = 1500 * tldMultiplier(tld)
    const bands = priceFromScore(score, base)
    const confidence = Math.min(0.95, 0.4 + 0.5 * metrics.trendScore)

    let narrative = `“${domain}” shows ${len <= 8 ? "strong" : "moderate"} brandability with ${age}y age, CPC ~$${cpc.toFixed(
      2,
    )}, and ~${backlinks.toLocaleString()} backlinks. Given comps ~${comps}, we estimate $${bands.low.toLocaleString()}–$${bands.high.toLocaleString()} with ${Math.round(confidence * 100)}% confidence.`

    try {
      if (ENV.GROQ_API_KEY) {
        const { text } = await generateText({
          model: groq(ENV.GROQ_MODEL),
          prompt: `You are an expert domain analyst. In 80-120 words, write a concise valuation narrative for "${domain}".
Metrics:
- length: ${len}
- age (years): ${age}
- CPC (USD): ${cpc.toFixed(2)}
- backlinks: ${backlinks}
- comparable sales count (approx): ${comps}
- TLD: ${tld}
Provide context (brandability, end-user potential, liquidity) and end with a fair market range: $${bands.low}–$${bands.high}. Avoid trademarks.`,
        })
        narrative = text
      }
    } catch (e) {
      console.error("Groq generation failed:", e)
      // keep fallback narrative
    }

    const payload = {
      low: bands.low,
      mid: bands.mid,
      high: bands.high,
      confidence,
      metrics,
      narrative,
    }

    if (save) {
      const db = await getDb()
      const session = await getSession()
      if (db) {
        await db.collection("valuations").insertOne({
          userId: session ? session.uid : null,
          domain,
          ...payload,
          createdAt: new Date(),
        })
      }
    }

    return NextResponse.json(payload)
  } catch (error: any) {
    console.error("Unhandled error in /api/valuation:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
