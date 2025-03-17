"use client"

import { Badge } from "@/components/ui/badge"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command"
import { DockerTool, dockerTools } from "@/lib/docker-tools"
import { cn } from "@/lib/utils"
import { BoxSelect, Check, Database, Server, Shield, Tag } from "lucide-react"
import { useEffect, useState } from "react"

interface SearchCommandProps {
  selectedTools: string[]
  onToggleToolSelection: (toolId: string) => void
}

export function SearchCommand({ selectedTools, onToggleToolSelection }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter tools based on search term
  const filteredTools = dockerTools.filter((tool) => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = []
    }
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, DockerTool[]>)

  // Handle keyboard shortcut to open dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Media":
        return <BoxSelect className="h-4 w-4" />
      case "Database":
        return <Database className="h-4 w-4" />
      case "Networking":
        return <Server className="h-4 w-4" />
      case "Security":
        return <Shield className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen} 
        className="z-50"
        onKeyDown={(e) => {
          // Close on escape
          if (e.key === "Escape") {
            setOpen(false)
          }
        }}
      >
        <CommandInput 
          placeholder="Search for tools, categories, tags..." 
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          <CommandEmpty>No Docker tools found.</CommandEmpty>
          
          {/* Selected tools group */}
          {selectedTools.length > 0 && (
            <>
              <CommandGroup heading={`Selected (${selectedTools.length})`}>
                {selectedTools.map((toolId) => {
                  const tool = dockerTools.find(t => t.id === toolId)
                  if (!tool) return null
                  
                  return (
                    <CommandItem
                      key={tool.id}
                      onSelect={() => onToggleToolSelection(tool.id)}
                      className="flex items-center"
                    >
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{tool.name}</span>
                      <div className="ml-auto flex gap-1">
                        {tool.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="h-5 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          
          {/* Group tools by category */}
          {Object.entries(groupedTools).map(([category, tools]) => (
            <CommandGroup 
              key={category} 
              heading={category}
            >
              {tools.map((tool) => (
                <CommandItem
                  key={tool.id}
                  onSelect={() => onToggleToolSelection(tool.id)}
                  className={cn(
                    "flex items-center",
                    selectedTools.includes(tool.id) && "bg-accent/50"
                  )}
                >
                  {getCategoryIcon(tool.category)}
                  <span className="ml-2">{tool.name}</span>
                  
                  <div className="ml-auto flex gap-1">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="h-5 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
} 