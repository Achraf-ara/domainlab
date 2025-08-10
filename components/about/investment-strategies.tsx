import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Target, Zap, Shield, Globe } from "lucide-react"

const strategies = [
  {
    name: "Long-term Brandable Holdings",
    icon: Shield,
    timeframe: "2-10 years",
    riskLevel: 60,
    potentialReturn: 85,
    description: "Focus on memorable, pronounceable domains with strong branding potential",
    characteristics: [
      "Short, memorable names (5-8 characters)",
      "Easy to pronounce and spell",
      "No hyphens or numbers",
      "Strong commercial appeal",
      ".com preferred for maximum value",
    ],
    examples: ["Uber.com", "Zoom.com", "Slack.com", "Stripe.com"],
    strategy: [
      "Research emerging industries and trends",
      "Focus on invented words with commercial appeal",
      "Hold through market cycles for maximum appreciation",
      "Target startups and growing companies as buyers",
    ],
    pros: ["High appreciation potential", "Less competition", "Evergreen value"],
    cons: ["Longer holding periods", "Higher initial investment", "Market timing risk"],
  },
  {
    name: "Short-term Trend Flipping",
    icon: Zap,
    timeframe: "1-12 months",
    riskLevel: 85,
    potentialReturn: 70,
    description: "Capitalize on emerging trends and viral keywords for quick profits",
    characteristics: [
      "Trending keywords and phrases",
      "News-driven or viral topics",
      "Seasonal opportunities",
      "Technology and cultural trends",
      "Multiple TLD variations",
    ],
    examples: ["AI domains", "Crypto terms", "Pandemic-related", "Metaverse keywords"],
    strategy: [
      "Monitor Google Trends and social media",
      "Act quickly on emerging trends",
      "Register multiple variations and TLDs",
      "Price for quick turnover, not maximum profit",
    ],
    pros: ["Quick returns", "Lower holding costs", "High volume potential"],
    cons: ["High risk", "Trend dependency", "Timing critical"],
  },
  {
    name: "Geographic & Local Targeting",
    icon: Globe,
    timeframe: "6 months - 3 years",
    riskLevel: 45,
    potentialReturn: 65,
    description: "Target location-specific domains for local businesses and services",
    characteristics: [
      "City + service combinations",
      "Regional business names",
      "Tourism and travel related",
      "Local event and venue names",
      "Country-code TLDs (ccTLDs)",
    ],
    examples: ["ChicagoPlumber.com", "NYCRealEstate.com", "LondonTours.co.uk"],
    strategy: [
      "Research growing cities and regions",
      "Focus on high-value service industries",
      "Target local business owners",
      "Consider economic development patterns",
    ],
    pros: ["Steady demand", "Clear target market", "Lower competition"],
    cons: ["Limited scalability", "Local market dependency", "Economic sensitivity"],
  },
  {
    name: "Exact Match Domain (EMD) Strategy",
    icon: Target,
    timeframe: "3 months - 2 years",
    riskLevel: 55,
    potentialReturn: 75,
    description: "Target domains that exactly match high-value search terms",
    characteristics: [
      "High search volume keywords",
      "Commercial intent terms",
      "Industry-specific phrases",
      "Product and service categories",
      "Strong CPC values",
    ],
    examples: ["CarInsurance.com", "WebDesign.net", "PersonalLoans.org"],
    strategy: [
      "Use keyword research tools for volume/CPC data",
      "Target commercial intent keywords",
      "Consider SEO value for end users",
      "Focus on evergreen business categories",
    ],
    pros: ["Clear value proposition", "SEO benefits", "Business appeal"],
    cons: ["High competition", "Google algorithm changes", "Trademark risks"],
  },
  {
    name: "Expired Domain Recovery",
    icon: Clock,
    timeframe: "Immediate - 6 months",
    riskLevel: 70,
    potentialReturn: 90,
    description: "Acquire expired domains with existing traffic, backlinks, and SEO value",
    characteristics: [
      "Existing backlink profiles",
      "Historical traffic data",
      "Established domain authority",
      "Clean ownership history",
      "No trademark conflicts",
    ],
    examples: ["Previously developed sites", "Abandoned businesses", "Lapsed renewals"],
    strategy: [
      "Use NamePulse Expired tool for discovery",
      "Analyze backlink quality and relevance",
      "Check for Google penalties or issues",
      "Act quickly on drop dates",
    ],
    pros: ["Immediate SEO value", "Existing traffic", "High ROI potential"],
    cons: ["Due diligence required", "Competition from drop catchers", "Quality varies"],
  },
  {
    name: "Portfolio Diversification",
    icon: TrendingUp,
    timeframe: "Ongoing",
    riskLevel: 40,
    potentialReturn: 70,
    description: "Spread risk across multiple strategies, TLDs, and market segments",
    characteristics: [
      "Mixed investment approaches",
      "Various TLD extensions",
      "Different price points",
      "Multiple market segments",
      "Balanced risk/reward profile",
    ],
    examples: ["20% brandables, 30% EMDs, 25% geo, 25% trends"],
    strategy: [
      "Allocate budget across strategies",
      "Regular portfolio review and rebalancing",
      "Track performance by category",
      "Adjust based on market conditions",
    ],
    pros: ["Risk mitigation", "Steady returns", "Market adaptability"],
    cons: ["Complex management", "Diluted focus", "Higher transaction costs"],
  },
]

export default function InvestmentStrategies() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-[#42cae5]/30">
            <TrendingUp className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
            Investment Mastery
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Proven Investment{" "}
            <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
              Strategies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the right investment approach based on your risk tolerance, timeline, and market expertise. Each
            strategy has unique characteristics and optimal use cases.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {strategies.map((strategy, index) => (
            <Card key={index} className="border-muted/50 hover:border-[#42cae5]/30 transition-colors">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#42cae5]/10 to-[#01040b]/10">
                      <strategy.icon className="h-6 w-6 text-[#42cae5]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{strategy.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {strategy.timeframe}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{strategy.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Risk & Return Metrics */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span className="font-medium">{strategy.riskLevel}%</span>
                    </div>
                    <Progress value={strategy.riskLevel} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Potential Return</span>
                      <span className="font-medium">{strategy.potentialReturn}%</span>
                    </div>
                    <Progress value={strategy.potentialReturn} className="h-2" />
                  </div>
                </div>

                {/* Characteristics */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Key Characteristics</h4>
                  <div className="grid gap-2">
                    {strategy.characteristics.map((char, charIndex) => (
                      <div key={charIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#42cae5] mt-2 flex-shrink-0" />
                        {char}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Examples</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.examples.map((example, exampleIndex) => (
                      <Badge key={exampleIndex} variant="outline" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Strategy Points */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Strategy Implementation</h4>
                  <div className="space-y-2">
                    {strategy.strategy.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3 p-2 rounded bg-muted/30">
                        <div className="w-5 h-5 rounded-full bg-[#42cae5]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-[#42cae5]">{pointIndex + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-muted/50">
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm text-green-600">Advantages</h5>
                    <div className="space-y-1">
                      {strategy.pros.map((pro, proIndex) => (
                        <div key={proIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-green-500" />
                          {pro}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm text-orange-600">Considerations</h5>
                    <div className="space-y-1">
                      {strategy.cons.map((con, conIndex) => (
                        <div key={conIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-orange-500" />
                          {con}
                        </div>
                      ))}
                    </div>
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
