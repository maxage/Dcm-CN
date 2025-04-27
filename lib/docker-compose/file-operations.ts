import type { DockerSettings } from "@/components/settings-panel"
import type { DockerTool } from "@/lib/docker-tools"
import posthog from "posthog-js"
import { toast } from "sonner"

export async function copyToClipboard(
  content: string,
  fileType: "compose" | "env",
  selectedTools: DockerTool[],
  settings: DockerSettings,
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content)

    toast.success(
      `${fileType === "compose" ? "Docker Compose" : ".env"} 文件已复制到剪贴板`,
      {
        description: `已复制 ${selectedTools.length} 个服务的配置。`,
        duration: 3000,
      },
    )

    posthog.capture("copy_compose_success", {
      selected_tools: selectedTools.map((t) => t.id),
      settings: settings,
      file_type: fileType,
    })

    return true
  } catch (err) {
    console.error("Failed to copy: ", err)

    toast.error("复制到剪贴板失败", {
      description:
        err instanceof Error ? err.message : "复制时发生错误",
      duration: 5000,
    })

    return false
  }
}

export function downloadFile(
  content: string,
  fileType: "compose" | "env",
  selectedTools: DockerTool[],
  settings: DockerSettings,
): void {
  const filename = fileType === "compose" ? "docker-compose.yaml" : ".env"

  try {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    toast.success(`${filename} 已下载`, {
      description: "文件已下载到您的计算机。",
      duration: 3000,
    })

    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    posthog.capture("download_compose_file", {
      selected_tools: selectedTools.map((t) => t.id),
      settings: settings,
      file_type: fileType,
    })
  } catch (err) {
    console.error("Failed to download file: ", err)

    toast.error("文件下载失败", {
      description:
        err instanceof Error
          ? err.message
          : "下载时发生错误",
      duration: 5000,
    })
  }
}
