"use client"

import { Button } from "@/components/ui/button"
import { Check, Copy, Download } from "lucide-react"

interface ActionButtonsProps {
  onCopy: () => void
  onDownload: () => void
  copied: boolean
}

export default function ActionButtons({
  onCopy,
  onDownload,
  copied,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        aria-label="下载文件"
        className="ml-2 rounded-md"
        onClick={onDownload}
        size="icon"
        variant="outline"
      >
        <span className="sr-only">下载</span>
        <Download className="h-4 w-4" />
      </Button>

      <Button
        aria-label={copied ? "已复制" : "复制到剪贴板"}
        className="relative ml-2 rounded-md"
        id="copy-button"
        onClick={onCopy}
        size="icon"
        variant="outline"
      >
        <span className="sr-only">{copied ? "已复制" : "复制"}</span>
        <Copy
          className={`h-4 w-4 transition-all duration-300 ${
            copied ? "scale-0" : "scale-100"
          }`}
        />
        <Check
          className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
            copied ? "scale-100" : "scale-0"
          }`}
        />
      </Button>
    </div>
  )
}
