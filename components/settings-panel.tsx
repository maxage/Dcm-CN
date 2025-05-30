"use client"

import SettingsForm from "@/components/settings/SettingsForm"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { RefreshCw, X } from "lucide-react"

interface SettingsPanelProps {
  isEmbedded?: boolean
  className?: string
  onSavingChange?: (saving: boolean) => void
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
  containerNamePrefix: string
}

export default function SettingsPanel({
  isEmbedded = false,
  className = "",
  onSavingChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Handle saving state change from SettingsForm
  const handleSavingChange = (saving: boolean) => {
    setIsSaving(saving)
    // Pass the saving state up to parent if the callback exists
    if (onSavingChange) onSavingChange(saving)
  }

  const handleReset = () => {
    // Implementation of handleReset function
  }

  if (isEmbedded) {
    return (
      <div className={className}>
        <SettingsForm onSavingChange={handleSavingChange} />
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
            <h3 className="font-medium text-lg">Docker Compose 设置</h3>
            {isSaving && (
              <div className="flex items-center gap-1 font-medium text-green-500 text-sm">
                <span className="animate-pulse">保存中...</span>
              </div>
            )}
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-105"
            >
              {isOpen ? "隐藏设置" : "显示设置"}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="motion-safe:animate-slide-down">
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">设置</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleReset}
                >
                  <RefreshCw size={14} />
                  重置
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={14} />
                  返回模板
                </Button>
              </div>
            </div>
            <SettingsForm onSavingChange={handleSavingChange} />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
