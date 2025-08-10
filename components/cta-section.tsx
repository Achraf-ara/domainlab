import React from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-6">
        <Card className="relative overflow-hidden border-[#42cae5]/20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#42cae5]/10 via-transparent to-[#01040b]/10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%2342cae5\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          
          <CardContent className="relative p-8 lg:p-16 text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#42cae5]/10 to-[#01040b]/10 border border-[#42cae5]/20">
                <Sparkles className="h-4 w-4 text-[#42cae5]" />
                <span className="text-sm font-medium">Start Your Domain Journey</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Ready to Discover Your Next{" "}
                <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
                  Premium Domain?
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful domain investors who use NamePulse to find, value, and track premium domains. 
                Start your search today and discover hidden opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/search">
                <Button size="lg" className="bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white hover:opacity-90 transition-opacity">
                  Start Searching
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="border-[#42cae5]/30 hover:bg-[#42cae5]/10 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="pt-8 border-t border-muted/50">
              <p className="text-sm text-muted-foreground">
                No credit card required • Free tier available • Professional support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
