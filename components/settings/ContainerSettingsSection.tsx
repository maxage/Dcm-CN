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

interface ContainerSettingsSectionProps {
  settings: DockerSettings
  onSettingsChange: (key: keyof DockerSettings, value: string | boolean) => void
}

export function ContainerSettingsSection({
  settings,
  onSettingsChange,
}: ContainerSettingsSectionProps) {
  return (
    <div className="[animation-delay:600ms] motion-safe:animate-fade-in">
      <h4 className="mb-3 font-medium text-sm">容器设置</h4>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="restartPolicy">重启策略</Label>
          <Select
            value={settings.restartPolicy}
            onValueChange={(value) => onSettingsChange("restartPolicy", value)}
          >
            <SelectTrigger
              id="restartPolicy"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
            >
              <SelectValue placeholder="选择策略" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">不重启</SelectItem>
              <SelectItem value="always">总是重启</SelectItem>
              <SelectItem value="on-failure">失败时重启</SelectItem>
              <SelectItem value="unless-stopped">除非手动停止</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-muted-foreground text-xs">
            设置容器何时重启
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="networkMode">网络模式</Label>
          <Select
            value={settings.networkMode}
            onValueChange={(value) => onSettingsChange("networkMode", value)}
          >
            <SelectTrigger
              id="networkMode"
              className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
            >
              <SelectValue placeholder="选择网络" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bridge">桥接</SelectItem>
              <SelectItem value="host">主机</SelectItem>
              <SelectItem value="none">无网络</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-muted-foreground text-xs">
            设置容器如何连接网络
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="containerNamePrefix">容器名称前缀</Label>
          <Input
            id="containerNamePrefix"
            placeholder="homestack"
            value={settings.containerNamePrefix}
            onChange={(e) =>
              onSettingsChange("containerNamePrefix", e.target.value)
            }
            className="motion-safe:transition-all motion-safe:duration-300 motion-safe:focus:scale-[1.01]"
          />
          <p className="text-muted-foreground text-xs">
            设置容器名称的前缀
          </p>
        </div>
      </div>
    </div>
  )
}
