import DockerToolsClient from "@/components/DockerToolsClient"
import { fetchGitHubStars } from "@/lib/docker-tools"

export const dynamic = "force-static"
export const revalidate = 21600

export async function generateStaticParams() {
  await fetchGitHubStars()
  return [{ id: "static" }]
}

export default async function Home() {
  const tools = await fetchGitHubStars()

  return (
    <div className="min-h-screen bg-background">
      <main className="container relative z-10 mx-auto px-4 pt-4">
        <DockerToolsClient dockerTools={tools} />
      </main>
    </div>
  )
}
