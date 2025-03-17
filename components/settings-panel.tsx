"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  settings: DockerSettings;
  onSettingsChange: (settings: DockerSettings) => void;
}

export interface DockerSettings {
  configPath: string;
  dataPath: string;
  timezone: string;
  puid: string;
  pgid: string;
  umask: string;
  restartPolicy: string;
  networkMode: string;
  useTraefik: boolean;
  containerNamePrefix: string;
  preferredImageProvider: "default" | "linuxserver" | "hotio";
}

export default function SettingsPanel({
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof DockerSettings, value: string | boolean) => {
    setIsSaving(true);
    onSettingsChange({
      ...settings,
      [key]: value,
    });

    // Show saving indicator briefly
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

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
            {isSaving && (
              <span className="ml-2 flex items-center gap-1 text-muted-foreground text-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 motion-safe:animate-pulse" />
                Saving...
              </span>
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
              {isOpen ? "Hide Settings" : "Show Settings"}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="motion-safe:animate-slide-down">
          <CardContent className="p-4 pt-0">
            <div className="grid gap-6 pt-4">
              <div className="motion-safe:animate-fade-in">
                <h4 className="mb-3 font-medium text-sm">Volume Paths</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="configPath">Config Path</Label>
                    <Input
                      id="configPath"
                      placeholder="/path/to/config"
                      value={settings.configPath}
                      onChange={(e) =>
                        handleChange("configPath", e.target.value)
                      }
                      className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                    />
                    <p className="text-muted-foreground text-xs">
                      Path where configuration files will be stored
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dataPath">Data Path</Label>
                    <Input
                      id="dataPath"
                      placeholder="/path/to/data"
                      value={settings.dataPath}
                      onChange={(e) => handleChange("dataPath", e.target.value)}
                      className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                    />
                    <p className="text-muted-foreground text-xs">
                      Path where application data will be stored
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="[animation-delay:100ms] motion-safe:animate-fade-in" />

              <div className="[animation-delay:200ms] motion-safe:animate-fade-in">
                <h4 className="mb-3 font-medium text-sm">
                  Docker Image Preferences
                </h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Preferred Image Provider</Label>
                    <p className="text-muted-foreground text-xs">
                      Select your preferred Docker image provider
                    </p>
                  </div>
                  <div className="relative">
                    <ToggleGroup
                      type="single"
                      value={settings.preferredImageProvider}
                      onValueChange={(value) => {
                        if (value)
                          handleChange("preferredImageProvider", value);
                      }}
                      className="w-auto motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-[1.02]"
                    >
                      <ToggleGroupItem
                        value="default"
                        className={cn(
                          "px-2 py-1 text-xs motion-safe:transition-all motion-safe:duration-300",
                          settings.preferredImageProvider === "default" &&
                            "motion-safe:animate-scale-in",
                        )}
                      >
                        Default
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="linuxserver"
                        className={cn(
                          "relative px-2 py-1 text-xs motion-safe:transition-all motion-safe:duration-300",
                          settings.preferredImageProvider === "linuxserver" &&
                            "motion-safe:animate-scale-in",
                        )}
                      >
                        LinuxServer
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="hotio"
                        className={cn(
                          "px-2 py-1 text-xs motion-safe:transition-all motion-safe:duration-300",
                          settings.preferredImageProvider === "hotio" &&
                            "motion-safe:animate-scale-in",
                        )}
                      >
                        Hotio
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </div>

              <Separator className="[animation-delay:300ms] motion-safe:animate-fade-in" />

              <div className="[animation-delay:400ms] motion-safe:animate-fade-in">
                <h4 className="mb-3 font-medium text-sm">
                  Environment Variables
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.timezone}
                      onValueChange={(value) => handleChange("timezone", value)}
                    >
                      <SelectTrigger
                        id="timezone"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                      >
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">
                          America/New_York
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          America/Chicago
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          America/Denver
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          America/Los_Angeles
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Europe/London
                        </SelectItem>
                        <SelectItem value="Europe/Paris">
                          Europe/Paris
                        </SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                        <SelectItem value="Australia/Sydney">
                          Australia/Sydney
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                      Container timezone
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="puid">PUID</Label>
                    <Input
                      id="puid"
                      placeholder="1000"
                      value={settings.puid}
                      onChange={(e) => handleChange("puid", e.target.value)}
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
                      onChange={(e) => handleChange("pgid", e.target.value)}
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
                      onChange={(e) => handleChange("umask", e.target.value)}
                      className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                    />
                    <p className="text-muted-foreground text-xs">
                      File permission mask
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="[animation-delay:500ms] motion-safe:animate-fade-in" />

              <div className="[animation-delay:600ms] motion-safe:animate-fade-in">
                <h4 className="mb-3 font-medium text-sm">Container Settings</h4>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="restartPolicy">Restart Policy</Label>
                    <Select
                      value={settings.restartPolicy}
                      onValueChange={(value) =>
                        handleChange("restartPolicy", value)
                      }
                    >
                      <SelectTrigger
                        id="restartPolicy"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                      >
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">no</SelectItem>
                        <SelectItem value="always">always</SelectItem>
                        <SelectItem value="on-failure">on-failure</SelectItem>
                        <SelectItem value="unless-stopped">
                          unless-stopped
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                      When containers should restart
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="networkMode">Network Mode</Label>
                    <Select
                      value={settings.networkMode}
                      onValueChange={(value) =>
                        handleChange("networkMode", value)
                      }
                    >
                      <SelectTrigger
                        id="networkMode"
                        className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                      >
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bridge">bridge</SelectItem>
                        <SelectItem value="host">host</SelectItem>
                        <SelectItem value="none">none</SelectItem>
                        <SelectItem value="custom">custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">
                      Container network configuration
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="containerNamePrefix">
                      Container Name Prefix
                    </Label>
                    <Input
                      id="containerNamePrefix"
                      placeholder="myapp_"
                      value={settings.containerNamePrefix}
                      onChange={(e) =>
                        handleChange("containerNamePrefix", e.target.value)
                      }
                      className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
                    />
                    <p className="text-muted-foreground text-xs">
                      Prefix for container names
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="[animation-delay:700ms] motion-safe:animate-fade-in" />

              <div className="flex items-center justify-between [animation-delay:800ms] motion-safe:animate-fade-in">
                <div className="space-y-0.5">
                  <Label htmlFor="useTraefik">Use Traefik Proxy</Label>
                  <p className="text-muted-foreground text-xs">
                    Enable Traefik labels for reverse proxy
                  </p>
                </div>
                <Switch
                  id="useTraefik"
                  checked={settings.useTraefik}
                  onCheckedChange={(checked) =>
                    handleChange("useTraefik", checked)
                  }
                  className="motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:scale-110"
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
