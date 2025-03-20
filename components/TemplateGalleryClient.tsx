"use client";

import FloatingBar from "@/components/floating-bar";
import SettingsPanel from "@/components/settings-panel";
import { TemplateGallery } from "@/components/template-gallery";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import type { DockerTool } from "@/lib/docker-tools";
import { SettingsProvider } from "@/lib/settings-context";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface TemplateGalleryClientProps {
  dockerTools: DockerTool[];
}

export default function TemplateGalleryClient({
  dockerTools,
}: TemplateGalleryClientProps) {
  const router = useRouter();
  
  const {
    value: storedTools,
    setValue: setStoredTools,
    removeValue: clearStoredTools,
  } = useLocalStorage<string[]>(STORAGE_KEYS.SELECTED_TOOLS, []);

  // Get the DockerTool objects for selected tools
  const selectedToolObjects = storedTools
    .map((id) => dockerTools.find((tool) => tool.id === id))
    .filter((tool): tool is DockerTool => tool !== undefined);

  const handleSelectTemplate = (tools: DockerTool[]) => {
    // Get IDs of tools in the template
    const templateToolIds = tools.map((tool) => tool.id);
    
    // Merge with existing selections, avoiding duplicates
    const newSelection = [...new Set([...storedTools, ...templateToolIds])];
    
    // Update localStorage
    setStoredTools(newSelection);
  };

  const handleReset = () => {
    clearStoredTools();
  };

  return (
    <SettingsProvider>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push("/")}
        >
          <ArrowLeft size={16} />
          Back to Container Selection
        </Button>
      </div>

      <div className="[animation-delay:300ms] motion-safe:animate-slide-down">
        <SettingsPanel />
      </div>

      <FloatingBar
        selectedCount={storedTools.length}
        selectedTools={storedTools.map(
          (id) => dockerTools.find((tool) => tool.id === id)?.name || "",
        )}
        selectedToolIds={storedTools}
        selectedToolObjects={selectedToolObjects}
        onReset={handleReset}
      />

      <TemplateGallery
        allTools={dockerTools}
        onSelectTemplate={handleSelectTemplate}
        selectedTools={selectedToolObjects}
      />
    </SettingsProvider>
  );
} 