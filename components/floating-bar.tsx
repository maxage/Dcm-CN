"use client"

import { ServiceCircles } from "@/components/magicui/avatar-circles"
import { SearchCommand } from "@/components/search-command"
import { Button } from "@/components/ui/button"
import type { DockerTool } from "@/lib/docker-tools"
import { useSettings } from "@/lib/settings-context"
import { generateShareUrl } from "@/lib/url-utils"
import { cn } from "@/lib/utils"
import { RefreshCw, Search, Share2 } from "lucide-react"
import dynamic from "next/dynamic"
import posthog from "posthog-js"
import { useEffect, useState } from "react"
import { toast } from "sonner"

// Dynamically import CopyComposeModal with loading state
const CopyComposeModal = dynamic(
  () =>
    import("@/components/compose-modal/CopyComposeModal").then((mod) => ({
      default: mod.CopyComposeModal,
    })),
  {
    ssr: false, // Disable SSR for the Monaco editor to prevent hydration issues
  },
)

interface FloatingBarProps {
  selectedCount: number
  selectedTools: string[]
  selectedToolIds: string[]
  onReset?: () => void
  onToggleToolSelection?: (toolId: string) => void
  scrollPosition?: number
  selectedToolObjects: DockerTool[]
}

export default function FloatingBar({
  selectedCount,
  selectedTools,
  selectedToolIds,
  onReset,
  onToggleToolSelection,
  scrollPosition = 200,
  selectedToolObjects,
}: FloatingBarProps) {
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [isApple, setIsApple] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isResetActive, setIsResetActive] = useState(false)
  const { settings, resetSettings } = useSettings()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApple(/Mac|iPod|iPhone|iPad/.test(navigator.userAgent))
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsFixed(window.scrollY > scrollPosition)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollPosition])

  const handleResetClick = () => {
    if (!isResetActive) {
      setIsResetActive(true)
      return
    }

    if (onReset) onReset()
    setIsResetActive(false)
  }

  const handleResetMouseLeave = () => {
    if (isResetActive) {
      setIsResetActive(false)
    }
  }

  const handleShare = async () => {
    if (selectedCount === 0) return

    // Generate encoded share URL
    const shareUrl = generateShareUrl(selectedToolIds)

    // Show animation state
    setIsSharing(true)

    // Use clipboard API
    try {
      await navigator.clipboard.writeText(shareUrl)

      toast.success("分享链接已复制到剪贴板！", {
        duration: 2000,
      })

      posthog.capture("share_selection_clipboard", {
        selected_tools: selectedTools,
        url: shareUrl,
      })
    } catch (error) {
      toast.error("复制链接失败", {
        duration: 2000,
      })
    }

    // Reset animation state
    setTimeout(() => setIsSharing(false), 1000)
  }

  // Prevent rendering client-interactive elements during SSR
  const triggerSearchShortcut = (e: React.MouseEvent) => {
    if (!isMounted) return

    e.preventDefault()

    // Use a custom event that the SearchCommand component will listen for
    // Instead of trying to simulate a keyboard event
    const customEvent = new CustomEvent("triggerCommandK", {
      bubbles: true,
    })
    document.dispatchEvent(customEvent)
  }

  return (
    <>
      {onToggleToolSelection && (
        <SearchCommand
          selectedTools={selectedToolIds}
          onToggleToolSelection={onToggleToolSelection}
        />
      )}

      {isMounted && (
        <CopyComposeModal
          isOpen={isCopyDialogOpen}
          onOpenChange={(open) => {
            if (open) {
              posthog.capture("copy_compose_opened", {
                selected_tools: selectedTools,
                settings: settings,
              })
            }
            setIsCopyDialogOpen(open)
          }}
          selectedTools={selectedToolObjects}
        />
      )}

      <div
        className={cn(
          "z-30 w-full transition-all duration-300",
          isFixed
            ? "fixed top-0 right-0 left-0 bg-background/60 py-4 shadow-lg backdrop-blur-md"
            : "relative mb-8 [animation-delay:450ms] motion-safe:animate-slide-down",
        )}
      >
        <div
          className={cn(
            "container mx-auto w-full px-0",
            isFixed && "max-w-7xl px-4",
            isFixed
              ? ""
              : "rounded-lg border border-border bg-background/40 p-4 shadow-lg backdrop-blur-md motion-safe:animate-slide-up",
          )}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="items-center gap-2">
              <span className="font-xs text-muted-foreground">
                已选择 {selectedCount} 个服务
              </span>
              <div className="sm:w-auto">
                {selectedCount > 0 && (
                  <div className="flex max-w-full flex-wrap gap-1.5 sm:max-w-[600px]">
                    <ServiceCircles
                      selectedServices={selectedToolObjects}
                      spacing="-space-x-1 xs:-space-x-2 sm:-space-x-4"
                      onToggleServiceSelection={onToggleToolSelection}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2 flex w-full flex-wrap gap-2 sm:mt-0 sm:w-auto">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 transition-transform motion-safe:hover:scale-105"
                  onClick={triggerSearchShortcut}
                  disabled={!onToggleToolSelection}
                >
                  <Search className="h-3.5 w-3.5" />
                  <span className="xs:inline hidden">搜索</span>
                  <kbd className="pointer-events-none ml-1 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100 sm:inline-flex">
                    <span className="text-xs">
                      {isMounted ? (isApple ? "⌘" : "Ctrl") : "⌘"}
                    </span>
                    K
                  </kbd>
                </Button>

                <Button
                  variant="outline"
                  disabled={selectedCount === 0}
                  className={cn(
                    "flex xs:min-w-16 items-center gap-2 transition-transform",
                    isSharing
                      ? "motion-preset-confetti "
                      : "motion-safe:hover:scale-105",
                  )}
                  onClick={handleShare}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="xs:inline hidden">分享</span>
                </Button>

                {onReset && (
                  <Button
                    variant={isResetActive ? "destructive" : "outline"}
                    disabled={selectedCount === 0}
                    onClick={handleResetClick}
                    onMouseLeave={handleResetMouseLeave}
                    className="group relative flex items-center gap-2 transition-all motion-safe:hover:scale-105"
                  >
                    <RefreshCw
                      className={cn(
                        "h-3.5 w-3.5",
                        isResetActive && "animate-spin",
                      )}
                    />
                    {!isResetActive ? (
                      <span className="xs:inline hidden xs:min-w-16">
                        取消选择
                      </span>
                    ) : (
                      <span className="motion-preset-shake xs:min-w-16 text-destructive-foreground">
                        <span className="xs:inline hidden">确定吗？</span>
                      </span>
                    )}
                  </Button>
                )}
              </div>
              <Button
                disabled={selectedCount === 0}
                className="hover:motion-preset-confetti xs:w-auto font-semibold"
                onClick={() => setIsCopyDialogOpen(true)}
              >
                复制 Compose
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
