import { ENV } from "@/lib/env"

export type ExpiredItem = {
  domain: string
  dropDate: string
  traffic?: number
  backlinks?: number
  age?: number
  priceGuide?: number
  tags?: string[]
}

export async function fetchExpired(query: string): Promise<ExpiredItem[]> {
  if (!ENV.APIFY_API_TOKEN) {
    throw new Error("Apify API token not configured. Set APIFY_API_TOKEN to enable real expired domain data.")
  }

  const actorId = "martin1080p/expired-domains-scraper" // The Apify actor you want to use
  const apifyApiUrl = `https://api.apify.com/v2/acts/${actorId}/runs?token=${ENV.APIFY_API_TOKEN}`

  // Define the input for the Apify actor based on your query
  // This input structure might need adjustment based on the specific actor's documentation
  const actorInput = {
    keywords: query, // Assuming the actor accepts a 'keywords' field for search
    // Add other filters here if the actor supports them, e.g.,
    // tlds: [".com", ".net"],
    // minLength: 3,
    // maxLength: 15,
  }

  try {
    // 1. Run the expired domains scraper actor
    const runRes = await fetch(apifyApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actorInput),
    })

    if (!runRes.ok) {
      const errorText = await runRes.text()
      throw new Error(`Apify actor run failed: ${runRes.status} - ${errorText}`)
    }

    const runData = await runRes.json()
    const runId = runData.data?.id
    const defaultDatasetId = runData.data?.defaultDatasetId

    if (!runId || !defaultDatasetId) {
      throw new Error("Apify run ID or default dataset ID not found.")
    }

    // 2. Poll for run completion & get results URL
    // IMPORTANT: For a production app, implement a robust polling mechanism
    // (e.g., check run status periodically) instead of a fixed delay.
    // This fixed delay is for demonstration purposes.
    await new Promise((r) => setTimeout(r, 30000)) // Wait 30 seconds for the scraper to run

    const datasetItemsUrl = `https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${ENV.APIFY_API_TOKEN}&format=json`

    const resultsRes = await fetch(datasetItemsUrl)

    if (!resultsRes.ok) {
      const errorText = await resultsRes.text()
      throw new Error(`Apify results fetch failed: ${resultsRes.status} - ${errorText}`)
    }

    const data = await resultsRes.json()

    // Normalize the data to your ExpiredItem type
    return data.map((x: any) => ({
      domain: x.domain,
      dropDate: x.dropDate || x.drop_time || x.drop || new Date().toISOString().slice(0, 10),
      traffic: x.traffic ?? undefined,
      backlinks: x.backlinks ?? undefined,
      age: x.age ?? undefined,
      priceGuide: x.priceGuide ?? x.price ?? undefined,
      tags: x.tags || [],
    }))
  } catch (error) {
    console.error("Error fetching expired domains from Apify:", error)
    // Re-throw to be caught by the API route for proper error handling
    throw error
  }
}
