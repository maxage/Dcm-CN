"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PortConflictsAlertProps {
  portConflicts: {
    fixed: number
    conflicts: string[]
  }
}

export default function PortConflictsAlert({
  portConflicts,
}: PortConflictsAlertProps) {
  if (!portConflicts) return null

  return (
    <Alert variant="info" className="my-3 bg-secondary">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>检测到端口冲突并已修复</AlertTitle>
      <AlertDescription className="text-foreground text-xs">
        我们发现了 {portConflicts.conflicts.length} 个端口冲突并修复了{" "}
        {portConflicts.fixed} 个问题。我们已经帮您处理好了。因为我们就是这么酷 😎
        <ul className="mt-2 list-disc pl-6">
          {portConflicts.conflicts.map((conflict, i) => {
            // Parse the conflict message to extract port change information
            const originalConflict = conflict.split("\n")[0]
            const portChanges = conflict.split("\n").slice(1)

            return (
              <li key={`conflict-${i}`} className="mb-2">
                <div className="whitespace-pre-line text-xs">
                  {originalConflict}
                </div>
                {portChanges.length > 0 && (
                  <ul className="mt-1 list-none pl-4">
                    {portChanges.map((change, j) => {
                      // Extract port from -> to information if available
                      const portChangeMatch = change.match(
                        /→ Changed ([^:]+): (\d+) → (\d+)/,
                      )

                      if (portChangeMatch) {
                        const [_, service, oldPort, newPort] = portChangeMatch
                        return (
                          <li
                            key={`change-${j}`}
                            className="flex items-center text-xs"
                          >
                            <span className="font-medium">{service}:</span>
                            <span className="ml-1 rounded-md bg-destructive/20 px-1.5 py-0.5 font-mono">
                              {oldPort}
                            </span>
                            <span className="mx-1">→</span>
                            <span className="rounded-md bg-success/20 px-1.5 py-0.5 font-mono">
                              {newPort}
                            </span>
                          </li>
                        )
                      }

                      return (
                        <li
                          key={`change-${j}`}
                          className="whitespace-pre-line text-xs"
                        >
                          {change}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
