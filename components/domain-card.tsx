import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookmarkPlus, Globe, Wallet } from "lucide-react"

export type DomainItem = {
  domain: string
  tld: string
  available: boolean
  price: number
  traffic: number
  backlinks: number
  age: number
  tags?: string[]
}

export default function DomainCard({ item }: { item: DomainItem }) {
  const tags = item.tags || []
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="font-semibold">{item.domain}</div>
          <Badge variant={item.available ? "default" : "secondary"} className="capitalize">
            {item.available ? "available" : "taken"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>{item.tld}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-medium">${item.price.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Traffic</div>
            <div className="font-medium">{item.traffic.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Backlinks</div>
            <div className="font-medium">{item.backlinks.toLocaleString()}</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">Age: {item.age} yrs</div>
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 4).map((t) => (
            <Badge key={t} variant="outline" className="border-[#42cae5]/40 text-[#01040b] dark:text-white">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <BookmarkPlus className="h-4 w-4" />
          Save
        </Button>
        <Button size="sm" className="gap-2 bg-[#42cae5] text-black hover:bg-[#35b9d4]">
          <Wallet className="h-4 w-4" />
          Buy
        </Button>
      </CardFooter>
    </Card>
  )
}
