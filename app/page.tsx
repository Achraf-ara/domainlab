import { SiteHeader } from "@/components/site-header"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import StatsSection from "@/components/stats-section"
import CTASection from "@/components/cta-section"

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </main>
  )
}
