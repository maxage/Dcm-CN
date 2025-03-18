import DockerToolsClient from "@/components/DockerToolsClient"
import { fetchGitHubStars } from "@/lib/docker-tools"

// This will ensure the data is generated at build time
// and the page is statically rendered
export const dynamic = "force-static"

// This ensures the data is cached and reused across requests
export const revalidate = 21600 // revalidate every 6 hours

// Generate the data at build time
export async function generateStaticParams() {
  // This function will be called at build time
  await fetchGitHubStars()
  return [{ id: "static" }] // We need to return something even if we don't use it
}

export default async function Home() {
  // Since fetchGitHubStars was called in generateStaticParams,
  // this call will use the cached data from build time
  const tools = await fetchGitHubStars()

  return (
    <div className="min-h-screen bg-background">
      <main className="container relative z-10 mx-auto px-4 pt-4">
        <DockerToolsClient dockerTools={tools} />
      </main>
    </div>
  )
}
