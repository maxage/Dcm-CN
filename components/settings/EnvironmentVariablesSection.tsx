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
            <SelectContent className="max-h-[300px]">
              <SelectItem value="UTC">UTC</SelectItem>
              {/* Africa */}
              <SelectItem value="Africa/Abidjan">Africa/Abidjan</SelectItem>
              <SelectItem value="Africa/Accra">Africa/Accra</SelectItem>
              <SelectItem value="Africa/Algiers">Africa/Algiers</SelectItem>
              <SelectItem value="Africa/Cairo">Africa/Cairo</SelectItem>
              <SelectItem value="Africa/Casablanca">Africa/Casablanca</SelectItem>
              <SelectItem value="Africa/Johannesburg">Africa/Johannesburg</SelectItem>
              <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
              <SelectItem value="Africa/Nairobi">Africa/Nairobi</SelectItem>
              <SelectItem value="Africa/Tunis">Africa/Tunis</SelectItem>

              {/* America */}
              <SelectItem value="America/Anchorage">America/Anchorage</SelectItem>
              <SelectItem value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires</SelectItem>
              <SelectItem value="America/Bogota">America/Bogota</SelectItem>
              <SelectItem value="America/Chicago">America/Chicago</SelectItem>
              <SelectItem value="America/Denver">America/Denver</SelectItem>
              <SelectItem value="America/Halifax">America/Halifax</SelectItem>
              <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
              <SelectItem value="America/Mexico_City">America/Mexico_City</SelectItem>
              <SelectItem value="America/New_York">America/New_York</SelectItem>
              <SelectItem value="America/Phoenix">America/Phoenix</SelectItem>
              <SelectItem value="America/Santiago">America/Santiago</SelectItem>
              <SelectItem value="America/Sao_Paulo">America/Sao_Paulo</SelectItem>
              <SelectItem value="America/St_Johns">America/St_Johns</SelectItem>
              <SelectItem value="America/Toronto">America/Toronto</SelectItem>
              <SelectItem value="America/Vancouver">America/Vancouver</SelectItem>

              {/* Antarctica */}
              <SelectItem value="Antarctica/Casey">Antarctica/Casey</SelectItem>
              <SelectItem value="Antarctica/McMurdo">Antarctica/McMurdo</SelectItem>
              <SelectItem value="Antarctica/South_Pole">Antarctica/South_Pole</SelectItem>

              {/* Asia */}
              <SelectItem value="Asia/Baghdad">Asia/Baghdad</SelectItem>
              <SelectItem value="Asia/Bangkok">Asia/Bangkok</SelectItem>
              <SelectItem value="Asia/Dhaka">Asia/Dhaka</SelectItem>
              <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
              <SelectItem value="Asia/Hong_Kong">Asia/Hong_Kong</SelectItem>
              <SelectItem value="Asia/Jakarta">Asia/Jakarta</SelectItem>
              <SelectItem value="Asia/Jerusalem">Asia/Jerusalem</SelectItem>
              <SelectItem value="Asia/Karachi">Asia/Karachi</SelectItem>
              <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
              <SelectItem value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</SelectItem>
              <SelectItem value="Asia/Manila">Asia/Manila</SelectItem>
              <SelectItem value="Asia/Qatar">Asia/Qatar</SelectItem>
              <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
              <SelectItem value="Asia/Seoul">Asia/Seoul</SelectItem>
              <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
              <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
              <SelectItem value="Asia/Taipei">Asia/Taipei</SelectItem>
              <SelectItem value="Asia/Tehran">Asia/Tehran</SelectItem>
              <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>

              {/* Atlantic */}
              <SelectItem value="Atlantic/Azores">Atlantic/Azores</SelectItem>
              <SelectItem value="Atlantic/Canary">Atlantic/Canary</SelectItem>
              <SelectItem value="Atlantic/Cape_Verde">Atlantic/Cape_Verde</SelectItem>
              <SelectItem value="Atlantic/Reykjavik">Atlantic/Reykjavik</SelectItem>

              {/* Australia */}
              <SelectItem value="Australia/Adelaide">Australia/Adelaide</SelectItem>
              <SelectItem value="Australia/Brisbane">Australia/Brisbane</SelectItem>
              <SelectItem value="Australia/Darwin">Australia/Darwin</SelectItem>
              <SelectItem value="Australia/Hobart">Australia/Hobart</SelectItem>
              <SelectItem value="Australia/Melbourne">Australia/Melbourne</SelectItem>
              <SelectItem value="Australia/Perth">Australia/Perth</SelectItem>
              <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>

              {/* Europe */}
              <SelectItem value="Europe/Amsterdam">Europe/Amsterdam</SelectItem>
              <SelectItem value="Europe/Athens">Europe/Athens</SelectItem>
              <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
              <SelectItem value="Europe/Brussels">Europe/Brussels</SelectItem>
              <SelectItem value="Europe/Budapest">Europe/Budapest</SelectItem>
              <SelectItem value="Europe/Copenhagen">Europe/Copenhagen</SelectItem>
              <SelectItem value="Europe/Dublin">Europe/Dublin</SelectItem>
              <SelectItem value="Europe/Helsinki">Europe/Helsinki</SelectItem>
              <SelectItem value="Europe/Istanbul">Europe/Istanbul</SelectItem>
              <SelectItem value="Europe/Lisbon">Europe/Lisbon</SelectItem>
              <SelectItem value="Europe/London">Europe/London</SelectItem>
              <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
              <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
              <SelectItem value="Europe/Oslo">Europe/Oslo</SelectItem>
              <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
              <SelectItem value="Europe/Prague">Europe/Prague</SelectItem>
              <SelectItem value="Europe/Rome">Europe/Rome</SelectItem>
              <SelectItem value="Europe/Stockholm">Europe/Stockholm</SelectItem>
              <SelectItem value="Europe/Vienna">Europe/Vienna</SelectItem>
              <SelectItem value="Europe/Warsaw">Europe/Warsaw</SelectItem>
              <SelectItem value="Europe/Zurich">Europe/Zurich</SelectItem>

              {/* Indian */}
              <SelectItem value="Indian/Maldives">Indian/Maldives</SelectItem>
              <SelectItem value="Indian/Mauritius">Indian/Mauritius</SelectItem>

              {/* Pacific */}
              <SelectItem value="Pacific/Auckland">Pacific/Auckland</SelectItem>
              <SelectItem value="Pacific/Fiji">Pacific/Fiji</SelectItem>
              <SelectItem value="Pacific/Guam">Pacific/Guam</SelectItem>
              <SelectItem value="Pacific/Honolulu">Pacific/Honolulu</SelectItem>
              <SelectItem value="Pacific/Midway">Pacific/Midway</SelectItem>
              <SelectItem value="Pacific/Noumea">Pacific/Noumea</SelectItem>
              <SelectItem value="Pacific/Pago_Pago">Pacific/Pago_Pago</SelectItem>
              <SelectItem value="Pacific/Port_Moresby">Pacific/Port_Moresby</SelectItem>
              <SelectItem value="Pacific/Tahiti">Pacific/Tahiti</SelectItem>
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
