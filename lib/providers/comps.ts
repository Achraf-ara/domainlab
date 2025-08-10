// Fetch domain comps/valuation by scraping GoDaddy's public appraisal page.
// Returns the count of comps if available, else 0.
export async function fetchComps(domainOrKeyword: string): Promise<number> {
  try {
    const html = await fetch(
      `https://www.godaddy.com/domain-value-appraisal/app/${encodeURIComponent(domainOrKeyword)}`,
    ).then((res) => res.text())

    // Look for comps in HTML (simplified example)
    // This regex attempts to find a JSON array of "comps" within the HTML.
    // This method is fragile and may break if GoDaddy changes its page structure.
    const match = html.match(/"comps":\[(.*?)\]/)
    if (!match || !match[1]) {
      console.warn(`No comps array found for ${domainOrKeyword} in GoDaddy HTML.`)
      return 0
    }

    // Attempt to parse the matched string as a JSON array
    const compsArray = JSON.parse(`[${match[1]}]`)
    return Array.isArray(compsArray) ? compsArray.length : 0
  } catch (error) {
    console.error(`Error fetching comps from GoDaddy for ${domainOrKeyword}:`, error)
    // Return 0 or re-throw based on desired error handling
    return 0
  }
}
