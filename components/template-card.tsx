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

  return (
    <Card className={`w-full h-full transition-all duration-200 ${isSelected ? "border-primary" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {template.icon && (
              <div className="h-8 w-8 relative shrink-0">
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
          <div className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
            {template.category}
          </div>
        </div>
        <CardDescription className="line-clamp-2 h-10">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm">
          <span className="font-semibold">{templateTools.length}</span> tools included
          {unavailableTools > 0 && (
            <span className="text-muted-foreground ml-1">
              ({unavailableTools} unavailable)
            </span>
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