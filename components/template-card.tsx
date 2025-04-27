import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DockerTool } from "@/lib/docker-tools"
import type { Template } from "@/lib/templates"
import { getToolsFromTemplate } from "@/lib/templates"
import { cn } from "@/lib/utils"
import { Eye, MinusCircle, PlusCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [iconError, setIconError] = useState(false)
  const [toolIconErrors, setToolIconErrors] = useState<Record<string, boolean>>(
    {},
  )

  const handleSelectTemplate = (e: React.MouseEvent) => {
    // Stop propagation to prevent navigation when clicking the button
    e.stopPropagation()

    if (isSelected) {
      // If template is already selected and we have an unselect handler, use it
      if (onUnselectTemplate) {
        setLoading(true)
        try {
          onUnselectTemplate(template.tools)
          toast.success(`已从"${template.name}"模板中移除工具`)
        } catch (error) {
          toast.error("移除模板工具失败")
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
        `已将${templateTools.length}个工具添加到您的配置中`,
      )
    } catch (error) {
      toast.error("添加模板工具失败")
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

  // Navigate to template page
  const handleCardClick = () => {
    router.push(`/template/${template.id}`)
  }

  return (
    <Card
      className={cn(
        "group relative cursor-pointer select-none overflow-hidden rounded-sm transition-all hover:shadow-md",
        isSelected
          ? "bg-secondary"
          : "border-border hover:border-muted-foreground/20",
        "hover:motion-safe:scale-105",
        "flex h-80 flex-col",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleCardClick}
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

      {/* View Template Button (appears on hover) */}
      {isHovering && (
        <div className="absolute top-2 right-2 z-10">
          <Link
            href={`/template/${template.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1 bg-background/80 backdrop-blur-sm"
            >
              <Eye size={14} />
              <span className="text-xs">查看</span>
            </Button>
          </Link>
        </div>
      )}

      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {template.icon && !iconError ? (
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
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
                  "flex h-10 w-10 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
                  isSelected
                    ? "bg-primary/40 text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20",
                )}
              >
                <span className="font-bold">{template.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <CardTitle className="font-mono font-semibold text-lg leading-tight tracking-tight">
                {template.name}
              </CardTitle>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="secondary" className="font-normal">
            包含 {templateTools.length} 个工具
          </Badge>
          {unavailableTools > 0 && (
            <span className="text-muted-foreground text-xs">
              ({unavailableTools} 个不可用)
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 overflow-hidden p-4 pt-0">
        {/* Preview of the included tools */}
        <div className="flex flex-wrap gap-1">
          {previewTools.map((tool) => (
            <Badge
              key={tool.id}
              variant="outline"
              className={cn(
                "rounded-md px-1 py-0.5 font-normal text-xs transition-all duration-300",
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
              className="rounded-md bg-muted/80 px-1 py-0.5 font-normal text-xs"
            >
              还有 {templateTools.length - 4} 个
            </Badge>
          )}
        </div>
        <span className="line-clamp-2 text-muted-foreground text-sm">
          {template.description}
        </span>
      </CardContent>

      <div
        className={cn(
          "mt-auto flex items-center justify-center border-t p-3 transition-colors duration-200",
          isSelected
            ? "border-primary/30 bg-secondary/70"
            : "border-muted bg-muted/20 group-hover:bg-muted/40",
        )}
        onClick={(e) => e.stopPropagation()} // Prevent card click from triggering when clicking in this area
        onKeyDown={(e) => {
          // Prevent propagation when Space or Enter is pressed
          if (e.key === " " || e.key === "Enter") {
            e.stopPropagation()
          }
        }}
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
              {isSelected ? "移除中..." : "添加中..."}
            </span>
          ) : isSelected ? (
            <>
              <MinusCircle size={16} className="text-red-500" />
              移除模板
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              使用模板
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
