"use client"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { tools } from "@/tools"
import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

interface SearchCommandProps {
  selectedTools: string[]
  onToggleToolSelection: (toolId: string) => void
}

export function SearchCommand({
  selectedTools,
  onToggleToolSelection,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    const handleCustomTrigger = () => {
      setOpen((open) => !open)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("triggerCommandK", handleCustomTrigger)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("triggerCommandK", handleCustomTrigger)
    }
  }, [])

  const handleToolSelect = (toolId: string) => {
    const tool = tools.find((t) => t.id === toolId)
    if (tool && !tool.isUnsupported) {
      onToggleToolSelection(toolId)
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle>搜索</DialogTitle>
      <CommandInput
        placeholder="搜索服务..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>未找到结果</CommandEmpty>

        <CommandGroup>
          {filteredTools.map((tool) => (
            <CommandItem
              key={tool.id}
              onSelect={() => handleToolSelect(tool.id)}
              className="flex items-center justify-between"
              disabled={tool.isUnsupported}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "mr-2 flex h-6 w-6 items-center justify-center overflow-hidden rounded-sm",
                    selectedTools.includes(tool.id) && !tool.isUnsupported
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {tool.icon ? (
                    <img
                      src={tool.icon}
                      alt={`${tool.name} 图标`}
                      className="h-full w-full object-contain p-0.5"
                    />
                  ) : (
                    <div className="font-bold text-xs">
                      {tool.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span>{tool.name}</span>
              </div>
              {tool.isUnsupported && (
                <div
                  className="ml-2 flex items-center text-destructive"
                  title="此服务不受支持"
                >
                  <X className="h-4 w-4" />
                </div>
              )}
              {selectedTools.includes(tool.id) && (
                <Check className="ml-2 h-4 w-4 text-primary" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
