import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { DockerTool } from "@/lib/docker-tools"
import type { Template } from "@/lib/templates"
import { getToolsFromTemplate } from "@/lib/templates"
import { cn } from "@/lib/utils"
import { MinusCircle, PlusCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface TemplateCardProps {
  template: Template
  allTools: DockerTool[]
  onSelectTemplate: (tools: DockerTool[]) => void
  onUnselectTemplate?: (toolIds: string[]) => void
  isSelected?: boolean
}

export function TemplateCard({
  template,
  allTools,
  onSelectTemplate,
  onUnselectTemplate,
  isSelected = false,
}: TemplateCardProps) {
  const [loading, setLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [iconError, setIconError] = useState(false)
  const [toolIconErrors, setToolIconErrors] = useState<Record<string, boolean>>(
    {},
  )

  const handleSelectTemplate = () => {
    if (isSelected) {
      // If template is already selected and we have an unselect handler, use it
      if (onUnselectTemplate) {
        setLoading(true)
        try {
          onUnselectTemplate(template.tools)
          toast.success(`Removed tools from "${template.name}" template`)
        } catch (error) {
          toast.error("Failed to remove template tools")
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      return
    }

    // Otherwise add the template
    setLoading(true)
    try {
      const templateTools = getToolsFromTemplate(template, allTools)
      if (templateTools.length === 0) {
        toast.error("No valid tools found in this template")
        return
      }

      onSelectTemplate(templateTools)
      toast.success(
        `Added ${templateTools.length} tools from "${template.name}" template`,
      )
    } catch (error) {
      toast.error("Failed to add template tools")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Find tools in this template to display count
  const templateTools = getToolsFromTemplate(template, allTools)
  const unavailableTools = template.tools.length - templateTools.length

  // Select up to 4 tools to display as preview
  const previewTools = templateTools.slice(0, 4)

  // Handle image error for a specific tool
  const handleToolIconError = (toolId: string) => {
    setToolIconErrors((prev) => ({
      ...prev,
      [toolId]: true,
    }))
  }

  return (
    <Card
      className={cn(
        "group relative flex h-full w-full select-none flex-col overflow-hidden transition-all duration-300",
        isSelected
          ? "border-primary bg-secondary"
          : "border-border hover:border-muted-foreground/20",
        "hover:shadow-md hover:motion-safe:scale-[1.03]",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
    >
      <div
        className={cn(
          "h-1 w-full transition-colors duration-300",
          isSelected
            ? "bg-primary"
            : isHovering
              ? "bg-primary/30"
              : "bg-transparent",
        )}
      />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {template.icon && !iconError ? (
              <div
                className={cn(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
                  isSelected
                    ? "bg-primary/40 text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20",
                )}
              >
                <Image
                  src={template.icon}
                  alt={template.name}
                  width={40}
                  height={40}
                  className="object-contain p-1.5"
                  onError={() => setIconError(true)}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
                  isSelected
                    ? "bg-primary/40 text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20",
                )}
              >
                <span className="font-bold">{template.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg leading-tight">
                {template.name}
              </CardTitle>
              <div className="mt-1 inline-block rounded-md bg-secondary px-2 py-0.5 text-secondary-foreground text-xs">
                {template.category}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2 line-clamp-2 h-10">
          {template.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="secondary" className="font-normal">
            {templateTools.length} tools included
          </Badge>
          {unavailableTools > 0 && (
            <span className="text-muted-foreground text-xs">
              ({unavailableTools} unavailable)
            </span>
          )}
        </div>

        {/* Preview of the included tools */}
        <div className="flex flex-wrap gap-1.5">
          {previewTools.map((tool) => (
            <Badge
              key={tool.id}
              variant="outline"
              className={cn(
                "rounded-md px-1.5 py-0.5 font-normal text-xs transition-all duration-300",
                isSelected ? "bg-secondary/80" : "group-hover:bg-background/80",
              )}
            >
              {tool.icon && !toolIconErrors[tool.id] ? (
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={12}
                  height={12}
                  className="mr-1.5 object-contain"
                  onError={() => handleToolIconError(tool.id)}
                />
              ) : (
                <span className="mr-1.5 inline-block h-3 w-3 rounded-full bg-primary/10 text-center font-bold text-[8px]">
                  {tool.name.charAt(0)}
                </span>
              )}
              {tool.name}
            </Badge>
          ))}
          {templateTools.length > 4 && (
            <Badge
              variant="outline"
              className="rounded-md bg-muted/80 px-1.5 py-0.5 font-normal text-xs"
            >
              +{templateTools.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>

      <div
        className={cn(
          "mt-auto flex items-center justify-center border-t p-3 transition-colors duration-200",
          isSelected
            ? "border-primary/30 bg-secondary/70"
            : "border-muted bg-muted/20 group-hover:bg-muted/40",
        )}
      >
        <Button
          variant={isSelected ? "outline" : "default"}
          className={cn(
            "w-full gap-2 font-medium transition-all",
            !loading && "motion-safe:hover:scale-105",
          )}
          onClick={handleSelectTemplate}
          disabled={loading || templateTools.length === 0}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {isSelected ? "Removing..." : "Adding..."}
            </span>
          ) : isSelected ? (
            <>
              <MinusCircle size={16} className="text-red-500" />
              Remove Template
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              Use Template
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
