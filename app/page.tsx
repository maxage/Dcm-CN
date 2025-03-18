"use client";

import ToolGrid from "@/components/ToolGrid";
import FloatingBar from "@/components/floating-bar";
import SettingsPanel, {
  type DockerSettings,
} from "@/components/settings-panel";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { dockerTools } from "@/lib/docker-tools";
import { useForm } from "@tanstack/react-form";

const defaultSettings: DockerSettings = {
  configPath: "/opt/appdata/config",
  dataPath: "/opt/appdata/data",
  timezone: "UTC",
  puid: "1000",
  pgid: "1000",
  umask: "022",
  restartPolicy: "unless-stopped",
  networkMode: "bridge",
  useTraefik: false,
  containerNamePrefix: "docker_",
};

export default function Home() {
  const {
    value: selectedTools,
    setValue: setSelectedTools,
    removeValue: clearSelectedTools,
  } = useLocalStorage<string[]>("dockerComposeSelectedTools", []);

  const {
    value: settings,
    setValue: setSettings,
    removeValue: clearSettings,
  } = useLocalStorage<DockerSettings>("dockerComposeSettings", defaultSettings);

  const form = useForm({
    defaultValues: {
      selectedTools: [] as string[],
      settings: settings,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
    },
  });

  const toggleToolSelection = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  };

  const handleReset = () => {
    clearSelectedTools();
    clearSettings();
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container relative z-10 mx-auto px-4 pt-4">
        <div className="[animation-delay:300ms] motion-safe:animate-slide-down">
          <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        </div>

        <FloatingBar
          selectedCount={selectedTools.length}
          selectedTools={selectedTools.map(
            (id) => dockerTools.find((tool) => tool.id === id)?.name || "",
          )}
          selectedToolIds={selectedTools}
          settings={settings}
          onReset={handleReset}
          onToggleToolSelection={toggleToolSelection}
        />

        <ToolGrid
          tools={dockerTools}
          selectedTools={selectedTools}
          onToggleSelection={toggleToolSelection}
        />
      </main>
    </div>
  );
}
