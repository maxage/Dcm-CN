"use client"

import ToolGrid from "@/components/ToolGrid"
import FloatingBar from "@/components/floating-bar"
import SettingsPanel from "@/components/settings-panel"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { STORAGE_KEYS } from "@/lib/constants"
import type { DockerTool } from "@/lib/docker-tools"
import { SettingsProvider } from "@/lib/settings-context"
import { useRouter, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { useCallback, useEffect } from "react"

interface DockerToolsClientProps {
  dockerTools: DockerTool[]
}

// Encode selected tool IDs into a compact string
function encodeToolIds(selectedIds: string[], allTools: DockerTool[]): string {
  // Create a mapping of tool IDs to their index position
  const toolIndexMap = Object.fromEntries(
    allTools.map((tool, index) => [tool.id, index])
  )
  
  // Create a binary representation where each bit represents if a tool is selected
  let binaryString = ''
  for (let i = 0; i < allTools.length; i++) {
    binaryString += selectedIds.includes(allTools[i].id) ? '1' : '0'
  }
  
  // Convert binary string to base64 for compactness
  // First pad the binary string to multiples of 8
  while (binaryString.length % 8 !== 0) {
    binaryString += '0'
  }
  
  // Convert binary to bytes, then to base64
  const bytes = new Uint8Array(binaryString.length / 8)
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.substr(i, 8)
    bytes[i / 8] = Number.parseInt(byte, 2)
  }
  
  // Convert to base64 and make URL safe
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

// Decode the compact string back to selected tool IDs
function decodeToolIds(encoded: string, allTools: DockerTool[]): string[] {
  try {
    // Make base64 URL-safe string back to regular base64
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(encoded.length + (4 - (encoded.length % 4)) % 4, '=')
    
    // Convert base64 to bytes, then to binary string
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
    let binaryString = ''
    
    bytes.forEach(byte => {
      binaryString += byte.toString(2).padStart(8, '0')
    })
    
    // Trim binary string to the number of tools
    binaryString = binaryString.substring(0, allTools.length)
    
    // Convert binary string back to tool IDs
    return allTools
      .filter((_, index) => binaryString[index] === '1')
      .map(tool => tool.id)
  } catch (error) {
    console.error('Error decoding tool IDs:', error)
    return []
  }
}

export default function DockerToolsClient({
  dockerTools,
}: DockerToolsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const {
    value: selectedTools,
    setValue: setSelectedTools,
    removeValue: clearSelectedTools,
  } = useLocalStorage<string[]>(STORAGE_KEYS.SELECTED_TOOLS, [])

  // Check for encoded tools in the URL on initial load
  const toolsParam = searchParams.get('share')
  
  // Load from URL parameter if present (only on initial page load)
  useEffect(() => {
    if (toolsParam) {
      const decodedTools = decodeToolIds(toolsParam, dockerTools)
      if (decodedTools.length > 0) {
        setSelectedTools(decodedTools)
      }
    }
  }, [toolsParam, dockerTools, setSelectedTools])

  // Generate a shareable URL with the current selection
  const generateShareableUrl = useCallback(() => {
    if (selectedTools.length === 0) return window.location.href
    
    const baseUrl = window.location.href.split('?')[0]
    const encoded = encodeToolIds(selectedTools, dockerTools)
    return `${baseUrl}?share=${encoded}`
  }, [selectedTools, dockerTools])

  const toggleToolSelection = (toolId: string) => {
    const tool = dockerTools.find((t) => t.id === toolId)
    if (tool?.isUnsupported) {
      return
    }

    posthog.capture("tool_selected", { tool_id: toolId })
    
    setSelectedTools((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    )
  }

  const handleReset = () => {
    clearSelectedTools()
  }

  // Get the DockerTool objects for selected tools
  const selectedToolObjects = selectedTools
    .map((id) => dockerTools.find((tool) => tool.id === id))
    .filter((tool): tool is DockerTool => tool !== undefined)

  return (
    <SettingsProvider>
      <div className="[animation-delay:300ms] motion-safe:animate-slide-down">
        <SettingsPanel />
      </div>

      <FloatingBar
        selectedCount={selectedTools.length}
        selectedTools={selectedTools.map(
          (id) => dockerTools.find((tool) => tool.id === id)?.name || "",
        )}
        selectedToolIds={selectedTools}
        selectedToolObjects={selectedToolObjects}
        onReset={handleReset}
        onToggleToolSelection={toggleToolSelection}
        generateShareableUrl={generateShareableUrl}
      />

      <ToolGrid
        tools={dockerTools}
        selectedTools={selectedTools}
        onToggleSelection={toggleToolSelection}
      />
    </SettingsProvider>
  )
}
