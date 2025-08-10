import KeywordCombiner from "@/components/bulk/keyword-combiner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Bulk Tools</h1>
        <p className="mt-1 text-sm text-muted-foreground">Combine keywords, bulk WHOIS, and batch valuation.</p>
        <Tabs defaultValue="combiner" className="mt-6">
          <TabsList>
            <TabsTrigger value="combiner">Keyword Combiner</TabsTrigger>
            <TabsTrigger value="whois">Bulk WHOIS</TabsTrigger>
            <TabsTrigger value="valuation">Bulk Valuation</TabsTrigger>
          </TabsList>
          <TabsContent value="combiner">
            <Card className="mt-4">
              <CardContent className="p-4">
                <KeywordCombiner />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="whois">
            <Card className="mt-4">
              <CardContent className="p-4 text-sm text-muted-foreground">
                Bulk WHOIS endpoint ready at /api/bulk-whois. For demo, use Search and WHOIS pages. You can wire a CSV
                upload here.
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="valuation">
            <Card className="mt-4">
              <CardContent className="p-4 text-sm text-muted-foreground">
                Bulk valuation endpoint ready at /api/valuation (loop). Add a CSV uploader and call the API per domain.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
