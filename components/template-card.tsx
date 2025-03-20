import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DockerTool } from "@/lib/docker-tools";
import type { Template } from "@/lib/templates";
import { getToolsFromTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";
import { CheckCircle, PlusCircle } from "lucide-react";
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
    <Card 
      className={cn(
        "group relative flex h-full w-full flex-col cursor-pointer select-none overflow-hidden transition-all duration-300",
        isSelected ? "bg-secondary" : "hover:border-muted-foreground/20",
        "hover:motion-safe:scale-105 hover:shadow-md"
      )}
      onClick={handleSelectTemplate}
    >
      <div 
        className={cn(
          "h-1 w-full transition-colors duration-300",
          isSelected ? "bg-primary" : "bg-transparent group-hover:bg-primary/30"
        )}
      />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {template.icon && (
              <div className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
                isSelected ? "bg-primary/40" : "bg-primary/10 group-hover:bg-primary/20"
              )}>
                <Image 
                  src={template.icon}
                  alt={template.name}
                  width={32}
                  height={32}
                  className="object-contain p-0.5"
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
      
      <CardContent className="flex-1 space-y-3 pb-4">
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
              className="rounded-md px-1 py-0.5 text-xs font-normal transition-all duration-300"
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
      
      <div 
        className={cn(
          "mt-auto flex items-center justify-center p-3 border-t transition-colors duration-200",
          isSelected ? "bg-secondary/50 border-primary/30" : "bg-muted/30 border-muted group-hover:bg-muted/50"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button 
          variant={isSelected ? "outline" : "default"} 
          className={cn(
            "w-full transition-transform gap-2 font-medium",
            !loading && !isSelected && "motion-safe:hover:scale-105"
          )}
          onClick={(e) => {
            e.stopPropagation();
            if (!isSelected) handleSelectTemplate();
          }}
          disabled={loading || templateTools.length === 0}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Adding...
            </span>
          ) : isSelected ? (
            <>
              <CheckCircle size={16} className="text-green-500" />
              Template Selected
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
  );
} 