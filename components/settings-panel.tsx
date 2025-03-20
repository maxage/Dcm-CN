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
import { useEffect, useState } from "react"

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

export default function SettingsPanel({
  settings,
  onSettingsChange,
  isEmbedded = false,
  className = "",
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localSettings, setLocalSettings] = useState({ ...settings })
  const [hasChanges, setHasChanges] = useState(false)

  // Update local settings when prop settings change
  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleChange = (key: keyof DockerSettings, value: string | boolean) => {
    setLocalSettings(prev => {
      const newSettings = {
        ...prev,
        [key]: value,
      }
      setHasChanges(JSON.stringify(newSettings) !== JSON.stringify(settings))
      return newSettings
    })
  }

  const handleSave = () => {
    onSettingsChange(localSettings)
    setHasChanges(false)
  }

  const handleCancel = () => {
    setLocalSettings({ ...settings })
    setHasChanges(false)
  }

  const SettingsContent = () => (
    <div className="grid gap-6 pt-4">
      <VolumePathsSection settings={localSettings} onSettingsChange={handleChange} />

      <Separator className="[animation-delay:100ms] motion-safe:animate-fade-in" />

      <EnvironmentVariablesSection
        settings={localSettings}
        onSettingsChange={handleChange}
      />

      <Separator className="[animation-delay:500ms] motion-safe:animate-fade-in" />

      <ContainerSettingsSection
        settings={localSettings}
        onSettingsChange={handleChange}
      />

      {hasChanges && (
        <div className="flex justify-end gap-2 [animation-delay:600ms] motion-safe:animate-fade-in">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )

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
}
