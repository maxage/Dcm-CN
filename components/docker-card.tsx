"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DockerTool } from "@/lib/docker-tools";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import { siGithub } from "simple-icons";

interface DockerCardProps {
  tool: DockerTool;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DockerCard({
  tool,
  isSelected,
  onSelect,
}: DockerCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't select the card if clicking on the GitHub icon
    if ((e.target as Element).closest(".github-link")) {
      e.stopPropagation();
      return;
    }
    onSelect();
  };

  const formatStars = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card
      className={cn(
        "group relative h-full cursor-pointer overflow-hidden transition-all hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5"
          : "hover:border-muted-foreground/20",
        "hover:motion-safe:scale-105",
      )}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          "h-1 w-full transition-colors duration-300",
          isSelected
            ? "bg-primary"
            : "bg-transparent group-hover:bg-primary/30",
        )}
      />

      {tool.githubUrl && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {tool.stars !== undefined && (
            <div className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-medium text-muted-foreground text-sm">
                {formatStars(tool.stars)}
              </span>
              <Star className="h-4 w-4 fill-muted-foreground text-muted-foreground" />
            </div>
          )}
          <Link
            href={tool.githubUrl}
            target="_blank"
            className="github-link rounded-full bg-background/80 p-1.5 opacity-0 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-background hover:shadow-md group-hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <svg
              aria-label="GitHub"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-primary"
            >
              <path d={siGithub.path} />
            </svg>
            <span className="sr-only">GitHub repository</span>
          </Link>
        </div>
      )}

      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center overflow-hidden rounded-md transition-all duration-300",
              isSelected
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary group-hover:bg-primary/20",
            )}
          >
            {tool.icon ? (
              <img
                src={tool.icon}
                alt={tool.name}
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <div className="font-bold">{tool.name.charAt(0)}</div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{tool.name}</h3>
            <p className="text-muted-foreground text-xs">{tool.category}</p>
          </div>
        </div>
        <p className="mb-3 line-clamp-2 select-none text-muted-foreground text-sm">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {tool.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs transition-all duration-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
