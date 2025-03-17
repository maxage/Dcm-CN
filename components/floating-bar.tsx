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
import { cn } from "@/lib/utils"
import { useState } from "react"

interface FloatingBarProps {
  show: boolean
  selectedCount: number
  selectedTools: string[]
  settings: DockerSettings
  onReset?: () => void
}

export default function FloatingBar({ show, selectedCount, selectedTools, settings, onReset }: FloatingBarProps) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false)
  
  // If there are no selected tools, don't render anything
  if (selectedCount === 0) return null

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
          "fixed bottom-0 left-0 right-0 transition-all duration-500 z-50",
          show ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 pb-4">
          <div className="bg-background/80 backdrop-blur-md border border-border rounded-lg shadow-lg p-4 motion-safe:animate-slide-up">
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
    </>
  )
}

