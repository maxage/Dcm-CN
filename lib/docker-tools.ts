
import { tools } from "@/tools"
export interface DockerTool {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  githubUrl?: string
  /** We recommend following this schema for common icons: https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/<Format>/<Name>.<Format> */
  icon?: string
  stars?: number
  composeContent?: string
  isUnsupported?: boolean
}

// Cache for GitHub stars data
let cachedTools: DockerTool[] | null = null

/**
 * Extracts the owner and repo from a GitHub URL
 * @param url GitHub URL in format https://github.com/owner/repo
 */
function extractGitHubInfo(
  url: string,
): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) return null
    return { owner: match[1], repo: match[2] }
  } catch {
    return null
  }
}

/**
 * Helper function to add delay between requests
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetches GitHub stars for all tools that have a GitHub URL
 * This function should be called at build time to populate the stars field
 */
export async function fetchGitHubStars(): Promise<DockerTool[]> {
  // Return cached data if available
  if (cachedTools) {
    return cachedTools
  }

  const toolsWithoutGitHub = tools.filter((tool) => !tool.githubUrl)
  const toolsWithGitHub = tools.filter((tool) => tool.githubUrl)

  // Create an array of promises for all GitHub requests
  const fetchPromises = toolsWithGitHub.map(async (tool) => {
    if (!tool.githubUrl) {
      return tool
    }

    const githubInfo = extractGitHubInfo(tool.githubUrl)
    if (!githubInfo) {
      return tool
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${githubInfo.owner}/${githubInfo.repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
        },
      )

      if (!response.ok) {
        console.warn(
          `Failed to fetch stars for ${tool.name}: ${response.statusText}`,
        )
        return tool
      }

      const data = await response.json()
      console.log(`Fetched stars for ${tool.name}`)
      return {
        ...tool,
        stars: data.stargazers_count,
      }
    } catch (error) {
      console.warn(`Error fetching stars for ${tool.name}:`, error)
      return tool
    }
  })

  // Execute all promises concurrently
  const updatedGitHubTools = await Promise.all(fetchPromises)

  // Combine tools with and without GitHub URLs
  const updatedTools = [...toolsWithoutGitHub, ...updatedGitHubTools]

  // Cache the results
  cachedTools = updatedTools
  return updatedTools
}
