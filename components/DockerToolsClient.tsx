"use client"

import ToolGrid from "@/components/ToolGrid"
import FloatingBar from "@/components/floating-bar"
import SettingsPanel from "@/components/settings-panel"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { STORAGE_KEYS } from "@/lib/constants"
import type { DockerTool } from "@/lib/docker-tools"
import { SettingsProvider } from "@/lib/settings-context"
import { decodeShareUrl } from "@/lib/url-utils"
import { useRouter, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { useCallback, useEffect } from "react"

interface DockerToolsClientProps {
  dockerTools: DockerTool[]
}

export default function DockerToolsClient({
  dockerTools,
}: DockerToolsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const {
    value: storedTools,
    setValue: setStoredTools,
    removeValue: clearStoredTools,
  } = useLocalStorage<string[]>(STORAGE_KEYS.SELECTED_TOOLS, [])

  // Get tools from URL search params
  const toolsFromParams = searchParams.get('tools')
  const shareParam = searchParams.get('share')
  
  // Determine which tool IDs to use, prioritizing share parameter
  const selectedTools = shareParam
    ? decodeShareUrl(shareParam)
    : toolsFromParams
      ? toolsFromParams.split(',').filter(id => dockerTools.some(tool => tool.id === id))
      : storedTools

  // Update URL with selected tools (only when toolsFromParams is set)
  const updateUrlParams = useCallback((toolIds: string[]) => {
    if (!searchParams.has('share')) { // Don't update URL if a share is being viewed
      const params = new URLSearchParams(searchParams.toString())
      
      if (toolIds.length > 0) {
        params.set('tools', toolIds.join(','))
      } else {
        params.delete('tools')
      }
      
      // Remove the share parameter if it exists
      if (params.has('share')) {
        params.delete('share')
      }
      
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
      router.push(newUrl)
    }
  }, [router, searchParams])

  // Sync localStorage with URL params on initial load
  useEffect(() => {
    if ((toolsFromParams || shareParam) && selectedTools.join(',') !== storedTools.join(',')) {
      setStoredTools(selectedTools)
    }
  }, [toolsFromParams, shareParam, storedTools, selectedTools, setStoredTools])

  const toggleToolSelection = (toolId: string) => {
    const tool = dockerTools.find((t) => t.id === toolId)
    if (tool?.isUnsupported) {
      return
    }

    posthog.capture("tool_selected", { tool_id: toolId })
    
    // Clear share parameter if present when modifying selection
    if (searchParams.has('share')) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('share')
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
      router.push(newUrl)
    }
    
    const newSelectedTools = selectedTools.includes(toolId)
      ? selectedTools.filter((id) => id !== toolId)
      : [...selectedTools, toolId]
    
    // Update both URL and localStorage
    updateUrlParams(newSelectedTools)
    setStoredTools(newSelectedTools)
  }

  const handleReset = () => {
    clearStoredTools()
    updateUrlParams([])
    
    // Clear share parameter if present
    if (searchParams.has('share')) {
      const params = new URLSearchParams(searchParams.toString())
      params.delete('share')
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
      router.push(newUrl)
    }
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
      />

      <ToolGrid
        tools={dockerTools}
        selectedTools={selectedTools}
        onToggleSelection={toggleToolSelection}
      />
    </SettingsProvider>
  )
}
