import TemplateGalleryClient from "@/components/TemplateGalleryClient";
import { fetchGitHubStars } from "@/lib/docker-tools";

export const dynamic = "force-static";
export const revalidate = 21600;

export async function generateStaticParams() {
  await fetchGitHubStars();
  return [{ id: "static" }];
}

export default async function TemplatesPage() {
  const tools = await fetchGitHubStars();

  return (
    <div className="min-h-screen bg-background">
      <main className="container relative z-10 mx-auto px-4 pt-4">
        <TemplateGalleryClient dockerTools={tools} />
      </main>
    </div>
  );
} 