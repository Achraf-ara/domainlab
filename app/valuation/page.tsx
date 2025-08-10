import { SiteHeader } from "@/components/site-header"
import ValuationForm from "@/components/valuation/valuation-form"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">AI-assisted Valuation</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Get price bands and confidence with an AI narrative. Narrative uses Groq when configured, with graceful
          fallback.
        </p>
        <div className="mt-6">
          <ValuationForm />
        </div>
      </section>
    </main>
  )
}
