"use client"

import type { DockerSettings } from "@/components/settings-panel"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FloatingBarProps {
  selectedCount: number
  selectedTools: string[]
  settings: DockerSettings
  onReset?: () => void
  searchTerm: string
  onSearchChange: (value: string) => void
  scrollPosition?: number
}

export default function FloatingBar({ 
  selectedCount, 
  selectedTools, 
  settings, 
  onReset,
  searchTerm,
  onSearchChange,
  scrollPosition = 200
}: FloatingBarProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  // Listen for scroll to determine if the bar should be fixed
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > scrollPosition)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPosition])

  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleReset = () => {
    if (onReset) {
      onReset()
    }
    setIsResetDialogOpen(false)
  }

  const handleCopy = () => {
    console.log("Copy docker-compose.yml with:", { selectedTools, settings })
    setIsCopyDialogOpen(false)
  }

  return (
    <>
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all selections and settings to their default values.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Reset All</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Copy Docker Compose</AlertDialogTitle>
            <AlertDialogDescription>
              Generate and copy docker-compose.yml for {selectedCount} selected tool{selectedCount !== 1 ? "s" : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCopy}>Copy to Clipboard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div
        className={cn(
          "w-full transition-all duration-300 z-30 motion-safe:animate-slide-down [animation-delay:450ms]",
          isFixed ? "fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md shadow-md py-4" : "relative mb-8"
        )}
      >
        <div className={cn("container mx-auto px-4", isFixed && "max-w-7xl")}>
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                <span className="text-muted-foreground text-sm">
                  <Search />
                </span>
              </div>
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search for tools..."
                className="pl-12 w-full shadow-sm transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
              />
            </div>

            {/* Selected Tools Information (Only shown when tools are selected) */}
            {selectedCount > 0 && (
              <div className={cn(
                "bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-lg p-4",
                !isFixed && "motion-safe:animate-slide-up"
              )}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary motion-safe:animate-pulse"></div>
                      <span className="font-medium">
                        {selectedCount} tool{selectedCount !== 1 ? "s" : ""} selected
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[600px]">
                      {selectedTools.map((tool, index) => (
                        <Badge
                          key={tool}
                          variant="outline"
                          className="text-xs py-0 h-5 bg-primary/5 hover:bg-primary/10"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {onReset && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsResetDialogOpen(true)}
                        className="text-xs motion-safe:hover:scale-105 transition-transform"
                      >
                        Reset All
                      </Button>
                    )}
                    <Button 
                      className="whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground motion-safe:animate-scale-in motion-safe:hover:scale-105 transition-transform"
                      onClick={() => setIsCopyDialogOpen(true)}
                    >
                      Copy Compose
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

