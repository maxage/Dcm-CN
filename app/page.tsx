import DockerToolsClient from "@/components/DockerToolsClient";
import { dockerTools } from "@/lib/docker-tools";

// This function would normally run at build time to generate the docker tools
// You can make this async and fetch from an API or database if needed
function generateDockerTools() {
  return dockerTools;
}

export default function Home() {
  const tools = generateDockerTools();

  return (
    <div className="min-h-screen bg-background">
      <main className="container relative z-10 mx-auto px-4 pt-4">
        <DockerToolsClient dockerTools={tools} />
      </main>
    </div>
  );
}
