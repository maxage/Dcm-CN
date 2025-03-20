"use client"

import { ContainerSettingsSection } from "@/components/settings/ContainerSettingsSection"
import { EnvironmentVariablesSection } from "@/components/settings/EnvironmentVariablesSection"
import { VolumePathsSection } from "@/components/settings/VolumePathsSection"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { memo, useCallback, useState } from "react"

interface SettingsPanelProps {
  settings: DockerSettings
  onSettingsChange: (settings: DockerSettings) => void
  isEmbedded?: boolean
  className?: string
}

export interface DockerSettings {
  configPath: string
  dataPath: string
  timezone: string
  puid: string
  pgid: string
  umask: string
  restartPolicy: string
  networkMode: string
  useTraefik: boolean
  containerNamePrefix: string
}

// Memoize the settings panel to prevent unnecessary re-renders
const SettingsPanel = memo(function SettingsPanel({
  settings,
  onSettingsChange,
  isEmbedded = false,
  className = "",
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Optimize handleChange with useCallback to maintain reference stability
  const handleChange = useCallback((key: keyof DockerSettings, value: string | boolean) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    })
  }, [settings, onSettingsChange])

  // Memoize the settings content to prevent re-renders when panel open state changes
  const SettingsContent = memo(() => (
    <div className="grid gap-6 pt-4">
      <VolumePathsSection settings={settings} onSettingsChange={handleChange} />

      <Separator className="[animation-delay:100ms] motion-safe:animate-fade-in" />

      <EnvironmentVariablesSection
        settings={settings}
        onSettingsChange={handleChange}
      />

      <Separator className="[animation-delay:500ms] motion-safe:animate-fade-in" />

      <ContainerSettingsSection
        settings={settings}
        onSettingsChange={handleChange}
      />
    </div>
  ))

  SettingsContent.displayName = "SettingsContent"

  if (isEmbedded) {
    return (
      <div className={className}>
        <SettingsContent />
      </div>
    )
  }

  return (
    <div className="mb-8 w-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
      >
        <div className="flex items-center justify-between bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">Docker Compose Settings</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105"
            >
              {isOpen ? "Hide Settings" : "Show Settings"}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="motion-safe:animate-slide-down">
          <CardContent className="p-4 pt-0">
            <SettingsContent />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
})

SettingsPanel.displayName = "SettingsPanel"

export default SettingsPanel
