import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Sparkles, Globe, LineChart, Database, Zap, Shield, TrendingUp, Search } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Valuation Engine",
    description: "Get market-based price ranges with confidence scores and detailed narratives powered by Groq AI.",
    link: "/valuation",
    badge: "AI-Powered",
    color: "text-[#42cae5]",
  },
  {
    icon: Globe,
    title: "WHOIS & Availability",
    description: "Real-time domain availability checks with cached WHOIS data to minimize costs and maximize speed.",
    link: "/whois",
    badge: "Real-time",
    color: "text-[#01040b] dark:text-white",
  },
  {
    icon: LineChart,
    title: "Trend Analysis",
    description: "Track keyword popularity and market trends using Google Trends integration for strategic insights.",
    link: "/trends",
    badge: "Market Intel",
    color: "text-[#42cae5]",
  },
  {
    icon: Database,
    title: "Expired Domains",
    description: "Discover high-potential expired domains with comprehensive metrics and drop date tracking.",
    link: "/expired",
    badge: "Opportunity",
    color: "text-[#01040b] dark:text-white",
  },
  {
    icon: Zap,
    title: "Instant Search",
    description: "Lightning-fast domain search powered by Elasticsearch with advanced filtering and sorting.",
    link: "/search",
    badge: "Fast",
    color: "text-[#42cae5]",
  },
  {
    icon: Shield,
    title: "Bulk Operations",
    description: "Process hundreds of domains at once with bulk WHOIS, valuation, and keyword combination tools.",
    link: "/bulk-tools",
    badge: "Efficient",
    color: "text-[#01040b] dark:text-white",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-[#42cae5]/30">
            <TrendingUp className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
            Complete Platform
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
              Domain Success
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From discovery to acquisition, NamePulse provides professional-grade tools for domain investors,
            entrepreneurs, and agencies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-muted/50 hover:border-[#42cae5]/30"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-current/10 to-current/5 ${feature.color}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-[#42cae5] transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center text-sm font-medium text-[#42cae5] hover:text-[#01040b] dark:hover:text-white transition-colors"
                >
                  Explore feature
                  <Search className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
