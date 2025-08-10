import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">FAQ & Glossary</h1>
        <div className="mt-6 grid gap-4">
          <Item q="What is WHOIS?" a="WHOIS is a public directory of domain ownership and registration details." />
          <Item
            q="How do you value a domain?"
            a="We combine age, length, CPC/volume, backlinks, comps, and trends to compute bands and confidence. An AI narrative contextualizes the range."
          />
          <Item
            q="Do I need an account?"
            a="No. Anonymous mode works. Create an account later to sync portfolios and alerts."
          />
          <Item
            q="How do you get trends?"
            a="We can integrate a Google Trends wrapper. Until configured, trends are generated with representative sample data."
          />
        </div>
      </section>
    </main>
  )
}

function Item({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="font-medium">{q}</div>
      <p className="mt-1 text-sm text-muted-foreground">{a}</p>
    </div>
  )
}
