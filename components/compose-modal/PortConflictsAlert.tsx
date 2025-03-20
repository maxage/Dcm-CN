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
      <AlertTitle>Port conflicts detected and fixed</AlertTitle>
      <AlertDescription className="text-foreground text-xs">
        We found {portConflicts.conflicts.length} port conflict(s) and fixed{" "}
        {portConflicts.fixed} issue(s). We've fixed it for you. Because we're
        just <b>that cool 😎</b>
        <ul className="mt-2 list-disc pl-6">
          {portConflicts.conflicts.map((conflict, i) => (
            <li key={`conflict-${i}`} className="whitespace-pre-line text-xs">
              {conflict}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
