import { TemplateCard } from "@/components/template-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DockerTool } from "@/lib/docker-tools";
import { templates } from "@/lib/templates";
import { useMemo, useState } from "react";

interface TemplateGalleryProps {
  allTools: DockerTool[];
  onSelectTemplate: (tools: DockerTool[]) => void;
  selectedTools: DockerTool[];
}

export function TemplateGallery({ allTools, onSelectTemplate, selectedTools }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Get all unique categories from templates
  const categories = useMemo(() => {
    const categorySet = new Set<string>(
      templates.map((template) => template.category)
    );
    return ["all", ...Array.from(categorySet)];
  }, []);

  // Filter templates by search query and category
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || template.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Check if template is selected (all tools in template are in selected tools)
  const isTemplateSelected = (templateTools: string[]) => {
    const selectedToolIds = selectedTools.map((tool) => tool.id);
    return templateTools.every((toolId) => selectedToolIds.includes(toolId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Template Gallery</h2>
        <p className="text-muted-foreground">
          Choose from predefined templates to quickly set up common Docker stacks
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize"
              >
                {category === "all" ? "All Templates" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    allTools={allTools}
                    onSelectTemplate={onSelectTemplate}
                    isSelected={isTemplateSelected(template.tools)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No templates found matching your criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 