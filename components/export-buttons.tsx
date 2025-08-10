"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function ExportButtons<T extends object>({
  data,
  filenameBase = "domainlab-export",
}: { data: T[]; filenameBase?: string }) {
  function toCSV(rows: T[]) {
    if (!rows.length) return ""
    const headers = Object.keys(rows[0]!)
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? "")).join(",")),
    ].join("\n")
    return csv
  }

  function downloadFile(content: string, mime: string, filename: string) {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-2 bg-transparent"
        onClick={() => downloadFile(JSON.stringify(data, null, 2), "application/json", `${filenameBase}.json`)}
      >
        <Download className="h-4 w-4" />
        JSON
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 bg-transparent"
        onClick={() => downloadFile(toCSV(data), "text/csv", `${filenameBase}.csv`)}
      >
        <Download className="h-4 w-4" />
        CSV
      </Button>
    </div>
  )
}
