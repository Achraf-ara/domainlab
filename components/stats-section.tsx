import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Database, Zap } from "lucide-react"

const stats = [
  {
    icon: Database,
    value: "10M+",
    label: "Domains Analyzed",
    description: "Comprehensive database coverage",
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable service guarantee",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Active Users",
    description: "Growing community",
  },
  {
    icon: Zap,
    value: "<100ms",
    label: "Search Speed",
    description: "Lightning-fast results",
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-[#42cae5]/5 via-transparent to-[#01040b]/5">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">Trusted by Domain Professionals</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of investors, entrepreneurs, and agencies who rely on NamePulse for their domain intelligence
            needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-muted/50 hover:border-[#42cae5]/30 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-[#42cae5]/10 to-[#01040b]/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-[#42cae5]" />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
