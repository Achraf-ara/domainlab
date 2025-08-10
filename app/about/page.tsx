import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, Shield, Users, Target, ArrowRight } from "lucide-react"
import StepByStepGuide from "@/components/about/step-by-step-guide"
import PlatformGuides from "@/components/about/platform-guides"
import InvestmentStrategies from "@/components/about/investment-strategies"

export default function Page() {
  return (
    <main>
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#42cae5]/5 via-transparent to-[#01040b]/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-[#42cae5]/30">
              <Users className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
              Domain Intelligence Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Master the Art of{" "}
              <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
                Domain Investing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              NamePulse provides professional-grade tools and comprehensive guides to help investors, entrepreneurs, and
              agencies succeed in the domain marketplace. From discovery to profitable exit, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/search">
                <Button size="lg" className="bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white">
                  Start Exploring
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg" className="border-[#42cae5]/30 bg-transparent">
                  View FAQ & Glossary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <StepByStepGuide />

      {/* Platform-Specific Guides */}
      <PlatformGuides />

      {/* Investment Strategies */}
      <InvestmentStrategies />

      {/* Platform Features */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="border-[#42cae5]/30">
                  <Target className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
                  Professional Tools
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">Built for Domain Professionals</h2>
                <p className="text-lg text-muted-foreground">
                  NamePulse combines cutting-edge technology with deep domain market expertise to provide the most
                  comprehensive platform for domain intelligence and investment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#42cae5]/10">
                    <Shield className="h-5 w-5 text-[#42cae5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Enterprise-Grade Security</h4>
                    <p className="text-sm text-muted-foreground">
                      GDPR/CCPA compliant with secure data handling and privacy controls
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#42cae5]/10">
                    <TrendingUp className="h-5 w-5 text-[#42cae5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-Time Market Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Live availability checks, trend analysis, and market intelligence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#42cae5]/10">
                    <Users className="h-5 w-5 text-[#42cae5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Community & Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Access to domain investment community and professional support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#42cae5] to-[#01040b] rounded-2xl blur-xl opacity-20" />
              <Card className="relative border-[#42cae5]/20">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Quick Start Guide</h3>
                    <p className="text-sm text-muted-foreground">Get started in minutes</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-[#42cae5] text-white text-xs flex items-center justify-center font-bold">
                        1
                      </div>
                      <span className="text-sm">Use Quick Search to generate available ideas</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-[#42cae5] text-white text-xs flex items-center justify-center font-bold">
                        2
                      </div>
                      <span className="text-sm">Run Valuation to gauge market range and confidence</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-[#42cae5] text-white text-xs flex items-center justify-center font-bold">
                        3
                      </div>
                      <span className="text-sm">Track keyword Trends and scout Expired domains</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-[#42cae5] text-white text-xs flex items-center justify-center font-bold">
                        4
                      </div>
                      <span className="text-sm">Save promising picks to your Account</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
