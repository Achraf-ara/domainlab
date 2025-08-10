"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HelpCircle, BookOpen, DollarSign, Shield, TrendingUp, Search, Globe } from "lucide-react"
import { useState } from "react"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: HelpCircle,
    questions: [
      {
        q: "What is NamePulse and how does it work?",
        a: "NamePulse is a comprehensive domain intelligence platform that helps investors, entrepreneurs, and agencies discover, value, and track premium domains. We combine AI-powered valuation, real-time availability checks, trend analysis, and market intelligence to provide professional-grade domain investment tools.",
      },
      {
        q: "Do I need an account to use NamePulse?",
        a: "No account is required for basic features like domain search, WHOIS lookup, and AI valuation. However, creating a free account allows you to save searches, build portfolios, set up alerts, and access advanced features like bulk operations and detailed analytics.",
      },
      {
        q: "How accurate are your domain valuations?",
        a: "Our AI valuation engine analyzes multiple factors including domain age, length, keyword metrics, comparable sales, backlinks, and market trends. Valuations come with confidence scores and detailed narratives. While no valuation is 100% accurate, our system provides market-based ranges that serve as excellent starting points for investment decisions.",
      },
      {
        q: "What makes NamePulse different from other domain tools?",
        a: "NamePulse combines multiple data sources and AI analysis in one platform. Unlike basic WHOIS tools, we provide comprehensive market intelligence, trend analysis, expired domain discovery, and professional-grade bulk operations. Our platform is designed specifically for serious domain investors and businesses.",
      },
    ],
  },
  {
    id: "valuation",
    title: "Domain Valuation",
    icon: DollarSign,
    questions: [
      {
        q: "How does your AI valuation engine work?",
        a: "Our valuation engine analyzes domain age, length, keyword CPC, search volume, backlinks, comparable sales data, and current market trends. It uses machine learning models trained on thousands of domain sales to provide low, mid, and high price estimates with confidence scores and detailed explanations.",
      },
      {
        q: "What factors influence domain value the most?",
        a: "Key factors include: 1) Domain length (shorter is generally better), 2) Brandability and memorability, 3) Keyword search volume and CPC, 4) Domain age and history, 5) Backlink profile, 6) TLD (.com premium), 7) Market trends and industry demand, 8) Comparable sales data.",
      },
      {
        q: "Can I get bulk valuations for multiple domains?",
        a: "Yes! Our Bulk Tools section allows you to upload CSV files or paste lists of domains for batch valuation. This is perfect for portfolio analysis, acquisition research, or due diligence on large domain lists.",
      },
      {
        q: "How often are valuations updated?",
        a: "Valuations are calculated in real-time using current market data. However, underlying metrics like backlinks and traffic data are updated periodically. For the most current valuation, we recommend re-running the analysis if significant time has passed.",
      },
    ],
  },
  {
    id: "search-tools",
    title: "Search & Discovery",
    icon: Search,
    questions: [
      {
        q: "How does the instant search feature work?",
        a: "Our instant search is powered by Elasticsearch, providing lightning-fast results from our indexed domain database. You can search by keywords, filter by TLD, price range, metrics, and tags. Results update in real-time as you type.",
      },
      {
        q: "What data sources do you use for availability checks?",
        a: "We integrate with Domainr for real-time availability status and optionally with GoDaddy for pricing data. This ensures you get accurate, up-to-date information about domain availability across multiple TLDs.",
      },
      {
        q: "How do I find expired domains with potential?",
        a: "Use our Expired Domains section to discover recently expired domains with existing traffic, backlinks, and SEO value. Filter by drop date, metrics, and keywords to find hidden gems before they're picked up by others.",
      },
      {
        q: "Can I save and organize my domain searches?",
        a: "Yes! With a free account, you can save searches, create custom portfolios, and set up alerts for specific criteria. This helps you track opportunities and organize your domain investment research.",
      },
    ],
  },
  {
    id: "marketplace",
    title: "Buying & Selling",
    icon: TrendingUp,
    questions: [
      {
        q: "Where should I list my domains for sale?",
        a: "Popular platforms include: GoDaddy Auctions (high traffic, auction format), Sedo (global reach, negotiation tools), Afternic (fast transfer, buy-it-now), Dan.com (modern interface, easy setup), and Flippa (broader audience). Each has different fee structures and audiences.",
      },
      {
        q: "What's the difference between auction and buy-it-now pricing?",
        a: "Auctions can generate competitive bidding and potentially higher prices for premium domains, but outcomes are uncertain. Buy-it-now provides immediate sales at fixed prices, better for quick liquidity. Many sellers use both strategies simultaneously.",
      },
      {
        q: "How do I negotiate domain purchases effectively?",
        a: "Research comparable sales, start with a reasonable offer (typically 10-30% of asking price), be professional and patient, highlight the domain's value to your business, consider payment terms, and always use escrow services for transactions over $500.",
      },
      {
        q: "What are the typical fees when buying/selling domains?",
        a: "Marketplace fees vary: GoDaddy (10-15%), Sedo (10-15%), Afternic (20%), Dan.com (9-19%). Escrow fees are typically 3.25% for transactions over $5,000. Factor these costs into your pricing strategy.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & Security",
    icon: Shield,
    questions: [
      {
        q: "How do you protect my data and searches?",
        a: "We're GDPR and CCPA compliant with enterprise-grade security. Your search history and portfolio data are encrypted and stored securely. You can export or delete your data at any time through your account settings.",
      },
      {
        q: "What is WHOIS data and why is it cached?",
        a: "WHOIS contains domain registration information including owner, registrar, and dates. We cache WHOIS data for 24 hours to reduce API costs and improve performance while ensuring you get reasonably current information.",
      },
      {
        q: "How do I transfer a domain safely?",
        a: "Always use escrow services (Escrow.com, Dan.com escrow) for valuable domains. Verify the seller's identity, check domain history, ensure the domain is unlocked and transfer-ready, and confirm all details before releasing payment.",
      },
      {
        q: "What should I check before buying a domain?",
        a: "Verify: 1) Clean WHOIS history, 2) No trademark conflicts, 3) No Google penalties (check Wayback Machine), 4) Legitimate traffic and backlinks, 5) Proper spelling and brandability, 6) Transfer eligibility and lock status.",
      },
    ],
  },
]

const glossaryTerms = [
  {
    term: "Aftermarket",
    definition:
      "The secondary market where previously registered domains are bought and sold, as opposed to registering new domains.",
  },
  {
    term: "Backorder",
    definition: "A service that attempts to register a domain immediately when it expires and becomes available again.",
  },
  {
    term: "Brandable Domain",
    definition:
      "A domain name that is memorable, pronounceable, and suitable for building a brand around, often invented or creative words.",
  },
  {
    term: "CPC (Cost Per Click)",
    definition:
      "The average amount advertisers pay for each click on ads related to a keyword, indicating commercial value.",
  },
  {
    term: "Drop Catching",
    definition:
      "The practice of registering expired domains the moment they become available again, often using automated systems.",
  },
  {
    term: "EMD (Exact Match Domain)",
    definition:
      "A domain name that exactly matches a search term or keyword phrase, like 'carinsurance.com' for car insurance.",
  },
  {
    term: "Escrow",
    definition:
      "A secure payment method where funds are held by a third party until domain transfer is completed successfully.",
  },
  {
    term: "Expired Domain",
    definition:
      "A domain that was previously registered but not renewed by the owner, making it available for registration again.",
  },
  {
    term: "Flip/Flipping",
    definition:
      "Buying domains with the intention of quickly reselling them for profit, typically within days to months.",
  },
  {
    term: "Hand Registration",
    definition:
      "Registering a domain directly from a registrar for the standard registration fee, as opposed to buying from aftermarket.",
  },
  {
    term: "Landing Page",
    definition:
      "A simple website placed on a domain for sale, often showing contact information and 'for sale' messaging.",
  },
  {
    term: "Parking",
    definition:
      "Placing advertisements on unused domains to generate revenue from type-in traffic while the domain is for sale.",
  },
  {
    term: "PBN (Private Blog Network)",
    definition:
      "A network of websites used to build links to a main site, often using expired domains with existing authority.",
  },
  {
    term: "Registrar",
    definition: "A company authorized to register domain names, such as GoDaddy, Namecheap, or Google Domains.",
  },
  {
    term: "SLD (Second Level Domain)",
    definition: "The part of the domain name to the left of the dot, like 'google' in 'google.com'.",
  },
  {
    term: "TLD (Top Level Domain)",
    definition: "The extension part of a domain name, such as .com, .org, .net, or country codes like .uk, .de.",
  },
  {
    term: "Type-in Traffic",
    definition:
      "Visitors who type a domain name directly into their browser, often indicating the domain's inherent value.",
  },
  {
    term: "WHOIS",
    definition:
      "A database query that returns information about domain registration, including owner, registrar, and important dates.",
  },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("getting-started")

  const filteredQuestions =
    faqCategories
      .find((cat) => cat.id === selectedCategory)
      ?.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []

  const filteredGlossary = glossaryTerms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#42cae5]/5 via-transparent to-[#01040b]/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="border-[#42cae5]/30">
              <HelpCircle className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
              Help & Support
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Frequently Asked Questions &{" "}
              <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
                Domain Glossary
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about domain investing, our platform features, and industry terminology. Can't
              find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 border-b bg-muted/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQ and glossary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <Tabs defaultValue="faq" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="glossary" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Glossary
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="faq" className="space-y-8">
              {/* Category Navigation */}
              <div className="grid gap-4 md:grid-cols-5">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center gap-2 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white"
                        : "bg-transparent border-muted hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="text-sm font-medium text-center">{category.title}</span>
                  </Button>
                ))}
              </div>

              {/* FAQ Content */}
              <Card className="border-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {faqCategories.find((cat) => cat.id === selectedCategory)?.icon && (
                      <div className="p-2 rounded-lg bg-gradient-to-br from-[#42cae5]/10 to-[#01040b]/10">
                        {(() => {
                          const IconComponent = faqCategories.find((cat) => cat.id === selectedCategory)!.icon
                          return <IconComponent className="h-5 w-5 text-[#42cae5]" />
                        })()}
                      </div>
                    )}
                    {faqCategories.find((cat) => cat.id === selectedCategory)?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredQuestions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-muted/50 rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredQuestions.length === 0 && searchTerm && (
                    <div className="text-center py-8 text-muted-foreground">
                      <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No questions found matching "{searchTerm}"</p>
                      <p className="text-sm mt-2">Try a different search term or browse categories above.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="glossary" className="space-y-8">
              <Card className="border-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#42cae5]/10 to-[#01040b]/10">
                      <BookOpen className="h-5 w-5 text-[#42cae5]" />
                    </div>
                    Domain Industry Glossary
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Essential terms and definitions for domain investing and the domain industry.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredGlossary.map((term, index) => (
                      <Card key={index} className="border-muted/30 hover:border-[#42cae5]/30 transition-colors">
                        <CardContent className="p-4 space-y-2">
                          <h4 className="font-semibold text-[#42cae5]">{term.term}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{term.definition}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredGlossary.length === 0 && searchTerm && (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No glossary terms found matching "{searchTerm}"</p>
                      <p className="text-sm mt-2">Try a different search term or browse all terms above.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-r from-[#42cae5]/5 via-transparent to-[#01040b]/5">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="max-w-2xl mx-auto text-center border-[#42cae5]/20">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#42cae5]/10 to-[#01040b]/10 flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-[#42cae5]" />
                </div>
                <h3 className="text-2xl font-bold">Still Need Help?</h3>
                <p className="text-muted-foreground">
                  Can't find the answer you're looking for? Our support team is here to help with any questions about
                  domain investing, platform features, or technical issues.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white">Contact Support</Button>
                <Button variant="outline" className="border-[#42cae5]/30 bg-transparent">
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Help Center
                </Button>
              </div>

              <div className="pt-6 border-t border-muted/50 text-sm text-muted-foreground">
                <p>Average response time: 2-4 hours • Available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
