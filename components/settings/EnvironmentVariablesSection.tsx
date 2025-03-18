"use client"

import type { DockerSettings } from "@/components/settings-panel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface EnvironmentVariablesSectionProps {
  settings: DockerSettings
  onSettingsChange: (key: keyof DockerSettings, value: string | boolean) => void
}

export function EnvironmentVariablesSection({
  settings,
  onSettingsChange,
}: EnvironmentVariablesSectionProps) {
  return (
    <div className="[animation-delay:400ms] motion-safe:animate-fade-in">
      <h4 className="mb-3 font-medium text-sm">Environment Variables</h4>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            value={settings.timezone}
            onValueChange={(value) => onSettingsChange("timezone", value)}
          >
            <SelectTrigger
              id="timezone"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
            >
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="America/New_York">America/New_York</SelectItem>
              <SelectItem value="America/Chicago">America/Chicago</SelectItem>
              <SelectItem value="America/Denver">America/Denver</SelectItem>
              <SelectItem value="America/Los_Angeles">
                America/Los_Angeles
              </SelectItem>
              <SelectItem value="Europe/London">Europe/London</SelectItem>
              <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
              <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
              <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-muted-foreground text-xs">Container timezone</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="puid">PUID</Label>
          <Input
            id="puid"
            placeholder="1000"
            value={settings.puid}
            onChange={(e) => onSettingsChange("puid", e.target.value)}
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
          />
          <p className="text-muted-foreground text-xs">
            User ID for permissions
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pgid">PGID</Label>
          <Input
            id="pgid"
            placeholder="1000"
            value={settings.pgid}
            onChange={(e) => onSettingsChange("pgid", e.target.value)}
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
          />
          <p className="text-muted-foreground text-xs">
            Group ID for permissions
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="umask">UMASK</Label>
          <Input
            id="umask"
            placeholder="022"
            value={settings.umask}
            onChange={(e) => onSettingsChange("umask", e.target.value)}
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
          />
          <p className="text-muted-foreground text-xs">File permission mask</p>
        </div>
      </div>
    </div>
  )
} 