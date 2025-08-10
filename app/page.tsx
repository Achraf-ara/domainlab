import { SiteHeader } from "@/components/site-header"
import HeroQuickSearch from "@/components/hero-quick-search"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Gauge, Globe, LineChart, Sparkles } from "lucide-react"

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <HeroQuickSearch />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="border-[#42cae5]/30">
            <CardContent className="grid gap-2 p-4">
              <div className="flex items-center gap-2 text-[#01040b] dark:text-white">
                <Sparkles className="h-5 w-5 text-[#42cae5]" />
                <div className="font-semibold">AI Valuation</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Market-based ranges with confidence and narrative, powered by Groq (fallback available).
              </p>
              <Link href="/valuation" className="text-sm text-[#42cae5] underline underline-offset-4">
                Value a domain →
              </Link>
            </CardContent>
          </Card>
          <Card className="border-[#42cae5]/30">
            <CardContent className="grid gap-2 p-4">
              <div className="flex items-center gap-2 text-[#01040b] dark:text-white">
                <Globe className="h-5 w-5 text-[#42cae5]" />
                <div className="font-semibold">WHOIS & Availability</div>
              </div>
              <p className="text-sm text-muted-foreground">Check ownership info and live availability across TLDs.</p>
              <Link href="/whois" className="text-sm text-[#42cae5] underline underline-offset-4">
                Run WHOIS →
              </Link>
            </CardContent>
          </Card>
          <Card className="border-[#42cae5]/30">
            <CardContent className="grid gap-2 p-4">
              <div className="flex items-center gap-2 text-[#01040b] dark:text-white">
                <LineChart className="h-5 w-5 text-[#42cae5]" />
                <div className="font-semibold">Trends & Expired</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Discover rising keywords and high-potential expired domains.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/trends" className="text-sm text-[#42cae5] underline underline-offset-4">
                  Explore trends →
                </Link>
                <Link href="/expired" className="text-sm text-[#42cae5] underline underline-offset-4">
                  Find expired →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-xl border p-6">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-[#42cae5]" />
            <h2 className="text-xl font-semibold">Get started in minutes</h2>
          </div>
          <ol className="mt-4 list-inside list-decimal text-sm text-muted-foreground">
            <li>Use Quick Search to generate available ideas.</li>
            <li>Run Valuation to gauge market range and confidence.</li>
            <li>Track keyword Trends and scout Expired for hidden gems.</li>
            <li>Save promising picks to your Account (anonymous mode works too).</li>
          </ol>
        </div>
      </section>
      <footer className="mt-16 border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} domainLab</div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/faq" className="hover:underline">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
