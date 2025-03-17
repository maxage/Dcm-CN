"use client"

import { SearchCommand } from "@/components/search-command"
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
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingBarProps {
  selectedCount: number
  selectedTools: string[]
  selectedToolIds: string[]
  settings: DockerSettings
  onReset?: () => void
  onToggleToolSelection: (toolId: string) => void
  scrollPosition?: number
}

export default function FloatingBar({ 
  selectedCount, 
  selectedTools, 
  selectedToolIds,
  settings, 
  onReset,
  onToggleToolSelection,
  scrollPosition = 200
}: FloatingBarProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  
  // Listen for scroll to determine if the bar should be fixed
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > scrollPosition)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPosition])

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

  const isApple = typeof navigator !== 'undefined' ? /Mac|iPod|iPhone|iPad/.test(navigator.userAgent) : false

  return (
    <>
      <SearchCommand 
        selectedTools={selectedToolIds} 
        onToggleToolSelection={onToggleToolSelection}
      />

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
          "w-full transition-all duration-300 z-30",
          isFixed 
            ? "fixed top-0 left-0 right-0 bg-background/60 backdrop-blur-md shadow-md py-4" 
            : "relative mb-8 motion-safe:animate-slide-down [animation-delay:450ms]"
        )}
      >
        <div className={cn("container px-0 w-full", isFixed && "max-w-7xl")}>
          <div className={cn(
            isFixed 
              ? "flex flex-col gap-4" 
              : "flex flex-col gap-4"
          )}>
            {/* Selected Tools Information */}
            <div className={cn(
              isFixed 
                ? "" 
                : "bg-background/40 backdrop-blur-md border border-border rounded-lg shadow-lg p-4 motion-safe:animate-slide-up"
            )}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary motion-safe:animate-pulse"></div>
                    <span className="font-medium">
                      {selectedCount} tool{selectedCount !== 1 ? "s" : ""} selected
                    </span>
                  </div>

                  {selectedCount > 0 && (
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
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs motion-safe:hover:scale-105 transition-transform flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault()
                      // Dispatch the keyboard shortcut
                      const kEvent = new KeyboardEvent('keydown', {
                        key: 'k',
                        metaKey: isApple,
                        ctrlKey: !isApple,
                        bubbles: true
                      })
                      document.dispatchEvent(kEvent)
                    }}
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>Search</span>
                    <kbd className="pointer-events-none ml-1 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                      <span className="text-xs">{isApple ? '⌘' : 'Ctrl'}</span>K
                    </kbd>
                  </Button>
                  
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
          </div>
        </div>
      </div>
    </>
  )
}

