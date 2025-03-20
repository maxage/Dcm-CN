import { TemplateCard } from "@/components/template-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DockerTool } from "@/lib/docker-tools"
import type { Template } from "@/lib/templates"
import { templates } from "@/lib/templates"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

interface TemplateGalleryProps {
  allTools: DockerTool[]
  onSelectTemplate: (tools: DockerTool[], template: Template) => void
  onUnselectTemplate?: (toolIds: string[], templateId: string) => void
  selectedTools: DockerTool[]
  selectedTemplateIds?: string[]
}

export function TemplateGallery({
  allTools,
  onSelectTemplate,
  onUnselectTemplate,
  selectedTools,
  selectedTemplateIds = [],
}: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  
  // Add AutoAnimate to the template grid
  const [templateGridRef] = useAutoAnimate<HTMLDivElement>({
    duration: 250,
    easing: "ease-in-out",
  })

  // Get all unique categories from templates
  const categories = useMemo(() => {
    const categorySet = new Set<string>(
      templates.map((template) => template.category),
    )
    return ["all", ...Array.from(categorySet)]
  }, [])

  // Filter templates by search query and category
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        activeCategory === "all" || template.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="font-bold text-2xl">Template Gallery</h2>
        <p className="text-muted-foreground">
          Choose from predefined templates to quickly set up common Docker
          stacks
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="mb-6 flex h-auto w-full flex-wrap gap-2 bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-md data-[state=active]:bg-secondary"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {filteredTemplates.length === 0 ? (
                <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">No templates found</p>
                </div>
              ) : (
                <div
                  ref={templateGridRef}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredTemplates
                    .filter(
                      (template) =>
                        category === "all" || template.category === category,
                    )
                    .map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        allTools={allTools}
                        onSelectTemplate={(tools) =>
                          onSelectTemplate(tools, template)
                        }
                        onUnselectTemplate={
                          onUnselectTemplate
                            ? (toolIds) => onUnselectTemplate(toolIds, template.id)
                            : undefined
                        }
                        isSelected={selectedTemplateIds.includes(template.id)}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
