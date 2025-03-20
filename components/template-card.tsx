import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { DockerTool } from "@/lib/docker-tools";
import type { Template } from "@/lib/templates";
import { getToolsFromTemplate } from "@/lib/templates";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface TemplateCardProps {
  template: Template;
  allTools: DockerTool[];
  onSelectTemplate: (tools: DockerTool[]) => void;
  isSelected?: boolean;
}

export function TemplateCard({ template, allTools, onSelectTemplate, isSelected = false }: TemplateCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSelectTemplate = () => {
    setLoading(true);
    try {
      const templateTools = getToolsFromTemplate(template, allTools);
      if (templateTools.length === 0) {
        toast.error("No valid tools found in this template");
        return;
      }
      
      onSelectTemplate(templateTools);
      toast.success(`Added ${templateTools.length} tools from "${template.name}" template`);
    } catch (error) {
      toast.error("Failed to add template tools");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Find tools in this template to display count
  const templateTools = getToolsFromTemplate(template, allTools);
  const unavailableTools = template.tools.length - templateTools.length;

  // Select up to 4 tools to display as preview
  const previewTools = templateTools.slice(0, 4);

  return (
    <Card className={`h-full w-full transition-all duration-200 hover:shadow-md ${isSelected ? "border-primary" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {template.icon && (
              <div className="relative h-8 w-8 shrink-0">
                <Image 
                  src={template.icon}
                  alt={template.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            )}
            <CardTitle className="text-lg">{template.name}</CardTitle>
          </div>
          <div className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            {template.category}
          </div>
        </div>
        <CardDescription className="h-10 line-clamp-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <div className="text-sm">
          <span className="font-semibold">{templateTools.length}</span> tools included
          {unavailableTools > 0 && (
            <span className="ml-1 text-muted-foreground">
              ({unavailableTools} unavailable)
            </span>
          )}
        </div>
        
        {/* Preview of the included tools */}
        <div className="flex flex-wrap gap-1">
          {previewTools.map((tool) => (
            <Badge 
              key={tool.id}
              variant="outline" 
              className="rounded-md px-1 py-0.5 text-xs font-normal"
            >
              {tool.icon && (
                <Image 
                  src={tool.icon} 
                  alt={tool.name} 
                  width={12} 
                  height={12} 
                  className="mr-1 object-contain"
                />
              )}
              {tool.name}
            </Badge>
          ))}
          {templateTools.length > 4 && (
            <Badge 
              variant="outline" 
              className="rounded-md bg-muted px-1 py-0.5 text-xs font-normal"
            >
              +{templateTools.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isSelected ? "outline" : "default"} 
                className="w-full" 
                onClick={handleSelectTemplate}
                disabled={loading || templateTools.length === 0}
              >
                {isSelected ? "Selected" : "Use Template"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add all tools from this template to your selection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
} 