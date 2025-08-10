import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, TrendingUp, Shield, Target, Handshake } from "lucide-react"

const steps = [
  {
    phase: "Research & Discovery",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    steps: [
      {
        title: "Market Research",
        description: "Use NamePulse Search to identify available domains in your target niche",
        details: "Filter by TLD, length, price range, and metrics. Analyze trends and keyword data.",
      },
      {
        title: "Competitive Analysis",
        description: "Study comparable sales and existing domain portfolios in your market",
        details: "Use our valuation tool to understand market pricing and identify undervalued opportunities.",
      },
      {
        title: "Trend Analysis",
        description: "Leverage our Trends tool to identify emerging keywords and market opportunities",
        details: "Track search volume, CPC data, and seasonal patterns to time your investments.",
      },
    ],
  },
  {
    phase: "Acquisition",
    icon: Handshake,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    steps: [
      {
        title: "Due Diligence",
        description: "Run comprehensive WHOIS checks and verify domain history",
        details: "Check for trademark issues, previous penalties, and clean ownership history.",
      },
      {
        title: "Negotiation Strategy",
        description: "Develop negotiation approach based on valuation data and market conditions",
        details: "Start with 10-30% of asking price, be patient, and always use professional communication.",
      },
      {
        title: "Secure Transaction",
        description: "Use escrow services for safe domain transfers and payment processing",
        details: "Verify domain unlock status, transfer codes, and complete all legal requirements.",
      },
    ],
  },
  {
    phase: "Portfolio Management",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    steps: [
      {
        title: "Organization & Tracking",
        description: "Use NamePulse Account to organize domains and track performance metrics",
        details: "Set up alerts, monitor renewal dates, and track ROI on your investments.",
      },
      {
        title: "Development vs. Parking",
        description: "Decide whether to develop domains or use parking services for revenue",
        details: "Consider development costs, time investment, and potential returns for each domain.",
      },
      {
        title: "Regular Valuation Updates",
        description: "Periodically re-evaluate your portfolio using updated market data",
        details: "Market conditions change - stay informed about your portfolio's current value.",
      },
    ],
  },
  {
    phase: "Monetization & Exit",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    steps: [
      {
        title: "Listing Strategy",
        description: "Choose optimal marketplaces and pricing strategies for each domain",
        details: "Consider GoDaddy Auctions, Sedo, Afternic, and Dan.com based on domain type.",
      },
      {
        title: "Marketing & Promotion",
        description: "Create compelling listings with professional descriptions and landing pages",
        details: "Highlight unique value propositions, potential use cases, and market opportunities.",
      },
      {
        title: "Sale Execution",
        description: "Manage negotiations, complete transfers, and optimize for future sales",
        details: "Learn from each transaction to improve your buying and selling strategies.",
      },
    ],
  },
]

export default function StepByStepGuide() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="border-[#42cae5]/30">
            <Target className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
            Complete Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Step-by-Step Domain Investment{" "}
            <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
              Masterclass
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From initial research to profitable exit, follow our proven methodology used by successful domain investors
            to build and manage profitable portfolios.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="relative">
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-xl ${phase.bgColor}`}>
                  <phase.icon className={`h-8 w-8 ${phase.color}`} />
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Phase {phaseIndex + 1}
                  </Badge>
                  <h3 className="text-2xl font-bold">{phase.phase}</h3>
                </div>
              </div>

              {/* Steps Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {phase.steps.map((step, stepIndex) => (
                  <Card
                    key={stepIndex}
                    className="relative border-muted/50 hover:border-[#42cae5]/30 transition-colors"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${phase.bgColor} flex items-center justify-center`}>
                            <span className={`text-sm font-bold ${phase.color}`}>{stepIndex + 1}</span>
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500 opacity-60" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground font-medium">{step.description}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Arrow to next phase */}
              {phaseIndex < steps.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="p-3 rounded-full bg-gradient-to-r from-[#42cae5]/10 to-[#01040b]/10 border border-[#42cae5]/20">
                    <ArrowRight className="h-6 w-6 text-[#42cae5]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
