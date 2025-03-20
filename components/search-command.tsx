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

  const filteredTools = tools.filter((tool) => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    
    // Search in name
    if (tool.name.toLowerCase().includes(searchLower)) return true
    
    // Search in description
    if (tool.description.toLowerCase().includes(searchLower)) return true
    
    // Search in tags
    if (tool.tags.some(tag => tag.toLowerCase().includes(searchLower))) return true
    
    // Search in category
    if (tool.category.toLowerCase().includes(searchLower)) return true
    
    return false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open dialog with Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      
      // Close dialog with Escape key (additional to the built-in behavior)
      if (e.key === "Escape" && open) {
        setOpen(false)
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
  }, [open])

  const handleToolSelect = (toolId: string) => {
    const tool = tools.find((t) => t.id === toolId)
    if (tool && !tool.isUnsupported) {
      onToggleToolSelection(toolId)
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search Services</DialogTitle>
      <CommandInput
        placeholder="Search for services..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>No services found.</CommandEmpty>

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
                      alt={`${tool.name} icon`}
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
                  title="This service is not supported"
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
