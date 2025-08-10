import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Clock, Users, Zap } from "lucide-react"

const platforms = [
  {
    name: "GoDaddy Auctions",
    logo: "🏆",
    description: "World's largest domain auction platform with high traffic and competitive bidding",
    pros: [
      "Massive buyer audience",
      "Auction format drives competitive pricing",
      "Integrated with GoDaddy ecosystem",
      "Strong brand recognition",
    ],
    cons: ["High competition", "10-15% commission fees", "Auction timing can be unpredictable"],
    bestFor: "Premium domains, brandable names, competitive markets",
    fees: "10-15% commission",
    tips: [
      "Set realistic reserve prices based on market data",
      "Time auctions for maximum visibility (weekdays, business hours)",
      "Use professional descriptions with clear value propositions",
      "Consider starting with lower reserves to generate interest",
    ],
  },
  {
    name: "Sedo",
    logo: "🌍",
    description: "Global domain marketplace with strong international presence and negotiation tools",
    pros: [
      "Global reach and multilingual support",
      "Professional brokerage services",
      "Flexible pricing options",
      "Strong in European markets",
    ],
    cons: ["10-15% commission fees", "Slower transaction process", "Less traffic than GoDaddy"],
    bestFor: "International domains, premium portfolios, brokered sales",
    fees: "10-15% commission",
    tips: [
      "Use both auction and fixed-price listings",
      "Leverage Sedo's brokerage service for high-value domains",
      "Optimize for international keywords and markets",
      "Consider Sedo's parking service for additional revenue",
    ],
  },
  {
    name: "Afternic",
    logo: "⚡",
    description: "Fast-transfer network with buy-it-now focus and broad distribution",
    pros: ["Fast Transfer technology", "Wide distribution network", "Buy-it-now simplicity", "Good for quick sales"],
    cons: ["20% commission (higher than competitors)", "Less auction functionality", "Smaller direct audience"],
    bestFor: "Quick sales, exact-match domains, business names",
    fees: "20% commission",
    tips: [
      "Price competitively for quick turnover",
      "Use clear, business-focused descriptions",
      "Leverage the distribution network for broader reach",
      "Focus on domains with obvious commercial value",
    ],
  },
  {
    name: "Dan.com",
    logo: "🚀",
    description: "Modern platform with sleek interface, lease-to-own options, and integrated payments",
    pros: [
      "Modern, user-friendly interface",
      "Lease-to-own payment plans",
      "Integrated payment processing",
      "Professional landing pages",
    ],
    cons: ["9-19% variable commission", "Newer platform with smaller audience", "Limited auction features"],
    bestFor: "Startups, brandable domains, payment plan sales",
    fees: "9-19% commission (sliding scale)",
    tips: [
      "Use lease-to-own for high-value domains",
      "Create compelling landing pages with use cases",
      "Target startup and tech audiences",
      "Leverage social proof and testimonials",
    ],
  },
  {
    name: "Flippa",
    logo: "📈",
    description: "Broader marketplace for digital assets including domains, websites, and businesses",
    pros: [
      "Diverse buyer audience",
      "Website and business sales too",
      "Detailed analytics and metrics",
      "Lower fees for some categories",
    ],
    cons: ["Less domain-focused", "Variable quality of listings", "More complex due diligence process"],
    bestFor: "Developed domains, website sales, digital assets",
    fees: "Success fee varies by sale price",
    tips: [
      "Include traffic and revenue data",
      "Provide comprehensive analytics",
      "Target investors and entrepreneurs",
      "Consider bundling related assets",
    ],
  },
]

export default function PlatformGuides() {
  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-[#42cae5]/30">
            <ExternalLink className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
            Marketplace Mastery
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Platform-Specific{" "}
            <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
              Selling Guides
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Master each major domain marketplace with detailed strategies, fee structures, and optimization tips from
            successful domain sellers.
          </p>
        </div>

        <div className="space-y-8">
          {platforms.map((platform, index) => (
            <Card key={index} className="border-muted/50 hover:border-[#42cae5]/30 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{platform.logo}</div>
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-3">
                        {platform.name}
                        <Badge variant="secondary" className="text-xs">
                          {platform.fees}
                        </Badge>
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">{platform.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Pros */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600 flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {platform.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {platform.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-[#42cae5] flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Best For
                    </h4>
                    <p className="text-sm text-muted-foreground">{platform.bestFor}</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="space-y-3 pt-4 border-t border-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#42cae5]" />
                    Pro Tips for {platform.name}
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {platform.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-6 h-6 rounded-full bg-[#42cae5]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#42cae5]">{tipIndex + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
