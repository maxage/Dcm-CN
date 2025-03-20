"use client"

import ToolGrid from "@/components/ToolGrid"
import FloatingBar from "@/components/floating-bar"
import SettingsPanel, { type DockerSettings } from "@/components/settings-panel"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { DEFAULT_SETTINGS, STORAGE_KEYS } from "@/lib/constants"
import type { DockerTool } from "@/lib/docker-tools"
import { useForm } from "@tanstack/react-form"
import posthog from "posthog-js"

interface DockerToolsClientProps {
  dockerTools: DockerTool[]
}

export default function DockerToolsClient({
  dockerTools,
}: DockerToolsClientProps) {
  const {
    value: selectedTools,
    setValue: setSelectedTools,
    removeValue: clearSelectedTools,
  } = useLocalStorage<string[]>(STORAGE_KEYS.SELECTED_TOOLS, [])

  const {
    value: settings,
    setValue: setSettings,
    removeValue: clearSettings,
  } = useLocalStorage<DockerSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)

  const form = useForm({
    defaultValues: {
      selectedTools: [] as string[],
      settings,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value)
    },
  })

  const toggleToolSelection = (toolId: string) => {
    const tool = dockerTools.find((t) => t.id === toolId)
    if (tool?.isUnsupported) {
      return
    }

    posthog.capture("tool_selected", { tool_id: toolId })
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    )
  }

  const handleSettingsChange = (newSettings: DockerSettings) => {
    // Use saveImmediately=true to explicitly save changes to localStorage
    setSettings(newSettings, true)
  }

  const handleReset = () => {
    clearSelectedTools()
    clearSettings()
  }

  // Get the DockerTool objects for selected tools
  const selectedToolObjects = selectedTools
    .map((id) => dockerTools.find((tool) => tool.id === id))
    .filter((tool): tool is DockerTool => tool !== undefined)

  return (
    <>
      <div className="[animation-delay:300ms] motion-safe:animate-slide-down">
        <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />
      </div>

      <FloatingBar
        selectedCount={selectedTools.length}
        selectedTools={selectedTools.map(
          (id) => dockerTools.find((tool) => tool.id === id)?.name || "",
        )}
        selectedToolIds={selectedTools}
        selectedToolObjects={selectedToolObjects}
        settings={settings}
        onReset={handleReset}
        onToggleToolSelection={toggleToolSelection}
      />

      <ToolGrid
        tools={dockerTools}
        selectedTools={selectedTools}
        onToggleSelection={toggleToolSelection}
      />
    </>
  )
}
