'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { DockerTool } from '@/lib/docker-tools';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { siGithub } from 'simple-icons';

interface DockerCardProps {
  tool: DockerTool;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DockerCard({ tool, isSelected, onSelect }: DockerCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't select the card if clicking on the GitHub icon
    if ((e.target as Element).closest('.github-link')) {
      e.stopPropagation();
      return;
    }
    onSelect();
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md overflow-hidden group h-full relative',
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/20',
        'hover:motion-safe:scale-105'
      )}
      onClick={handleCardClick}
    >
      <div
        className={cn(
          'h-1 w-full transition-colors duration-300',
          isSelected ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/30'
        )}
      />

      {tool.githubUrl && (
        <Link
          href={tool.githubUrl}
          target="_blank"
          className="github-link absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 p-1.5 rounded-full bg-background/80 hover:bg-background shadow-sm hover:shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary">
            <path d={siGithub.path} />
          </svg>
          <span className="sr-only">GitHub repository</span>
        </Link>
      )}

      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-md transition-all duration-300',
              isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary/20'
            )}
          >
            <div className="font-bold">{tool.name.charAt(0)}</div>
          </div>
          <div>
            <h3 className="font-medium">{tool.name}</h3>
            <p className="text-xs text-muted-foreground">{tool.category}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{tool.description}</p>
        <div className="flex flex-wrap gap-1">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs transition-all duration-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
