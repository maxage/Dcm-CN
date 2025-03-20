import type { DockerSettings } from "@/components/settings-panel"
import type { DockerTool } from "@/lib/docker-tools"
import posthog from "posthog-js"
import { toast } from "sonner"

/**
 * Copies content to clipboard and shows a toast notification
 * @param content Content to copy to clipboard
 * @param fileType Type of file being copied (compose or env)
 * @param selectedTools Array of selected tools
 * @param settings User settings
 * @returns Promise that resolves to true if copy succeeded, false otherwise
 */
export async function copyToClipboard(
  content: string,
  fileType: "compose" | "env",
  selectedTools: DockerTool[],
  settings: DockerSettings
): Promise<boolean> {
  try {
    // Copy the content to clipboard
    await navigator.clipboard.writeText(content)
    
    // Show toast notification
    toast.success(
      `${fileType === "compose" ? "Docker Compose" : ".env"} file copied to clipboard`,
      {
        description: `${selectedTools.length} service${selectedTools.length !== 1 ? "s" : ""} configuration copied.`,
        duration: 3000,
      }
    )

    // Log analytics
    posthog.capture("copy_compose_success", {
      selected_tools: selectedTools.map((t) => t.id),
      settings: settings,
      file_type: fileType,
    })

    return true
  } catch (err) {
    console.error("Failed to copy: ", err)
    
    toast.error("Failed to copy to clipboard", {
      description: err instanceof Error ? err.message : "An error occurred while copying",
      duration: 5000,
    })
    
    return false
  }
}

/**
 * Downloads content as a file
 * @param content Content to download
 * @param fileType Type of file to download (compose or env)
 * @param selectedTools Array of selected tools
 * @param settings User settings
 */
export function downloadFile(
  content: string,
  fileType: "compose" | "env",
  selectedTools: DockerTool[],
  settings: DockerSettings
): void {
  const filename = fileType === "compose" ? "docker-compose.yaml" : ".env"

  try {
    // Create a blob and download link
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()

    // Show toast notification
    toast.success(`${filename} downloaded`, {
      description: "File has been downloaded to your computer.",
      duration: 3000,
    })

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    // Log analytics
    posthog.capture("download_compose_file", {
      selected_tools: selectedTools.map((t) => t.id),
      settings: settings,
      file_type: fileType,
    })
  } catch (err) {
    console.error("Failed to download file: ", err)
    
    toast.error("Failed to download file", {
      description:
        err instanceof Error
          ? err.message
          : "An error occurred while downloading",
      duration: 5000,
    })
  }
} 