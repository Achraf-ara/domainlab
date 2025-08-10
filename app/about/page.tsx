import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">About domainLab</h1>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          domainLab helps investors and founders discover, evaluate, and track domains. Learn how to buy, hold, and sell
          with confidence across marketplaces.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Guide
            title="Step-by-step: buying, holding, selling"
            bullets={[
              "Research with Search, Trends, and Expired.",
              "Check WHOIS and negotiate or backorder.",
              "Value with AI, set a floor/ceiling, and list.",
              "Track offers, update pricing as trends shift.",
            ]}
          />
          <Guide
            title="Selling guides: GoDaddy, Sedo, Afternic"
            bullets={[
              "Create consistent listings with DNS verification.",
              "Use buy-it-now vs. make-offer strategically.",
              "Sync landing pages and escrow preferences.",
              "Leverage fast-transfer for premium TLDs.",
            ]}
          />
          <Guide
            title="FAQ & Glossary"
            bullets={[
              "What is WHOIS? What does drop-catching mean?",
              "How to understand CPC, volume, and comps.",
              "Parking vs. development trade-offs.",
            ]}
          />
          <Guide
            title="Investment strategies"
            bullets={[
              "Long-term brandables and short-term flips.",
              "Macro trends (AI, eco, fintech) and geo focus.",
              "Portfolio sizing, risk management, and rotation.",
            ]}
          />
        </div>

        <div className="mt-10 text-sm text-muted-foreground">
          Questions? See the{" "}
          <Link href="/faq" className="text-[#42cae5] underline">
            FAQ
          </Link>
          .
        </div>
      </section>
    </main>
  )
}

function Guide({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  )
}
