"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { dockerTools } from "@/lib/docker-tools";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchCommandProps {
  selectedTools: string[];
  onToggleToolSelection: (toolId: string) => void;
}

export function SearchCommand({
  selectedTools,
  onToggleToolSelection,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tools based on search term
  const filteredTools = dockerTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle keyboard shortcut to open dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Search Services</DialogTitle>
      <CommandInput
        placeholder="Search for services..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>No services found.</CommandEmpty>

        <CommandGroup>
          {filteredTools.map((tool) => (
            <CommandItem
              key={tool.id}
              onSelect={() => onToggleToolSelection(tool.id)}
              className="flex items-center justify-between"
            >
              <span>{tool.name}</span>
              {selectedTools.includes(tool.id) && (
                <Check className="ml-2 h-4 w-4 text-primary" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
