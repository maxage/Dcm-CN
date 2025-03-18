"use client"

import { Badge } from "@/components/ui/badge"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface BadgeListProps {
  items: string[]
  maxVisible?: number
}

export function BadgeList({ items, maxVisible = 4 }: BadgeListProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex max-w-[600px] flex-wrap gap-1.5">
      {items.slice(0, maxVisible).map((item, index) => (
        <Badge
          key={item}
          variant="outline"
          className="h-5 bg-primary/5 py-0 text-xs hover:bg-primary/10"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {item}
        </Badge>
      ))}

      {items.length > maxVisible && (
        <Popover>
          <PopoverTrigger asChild>
            <Badge
              variant="outline"
              className="h-5 cursor-pointer bg-primary/5 py-0 text-xs hover:bg-primary/10"
              style={{ animationDelay: `${maxVisible * 50}ms` }}
            >
              +{items.length - maxVisible} others
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="max-h-[300px] w-auto overflow-y-auto p-0">
            <div className="flex flex-col gap-1 p-2">
              {items.slice(maxVisible).map((item) => (
                <div
                  key={item}
                  className="rounded-sm px-2 py-1 text-sm hover:bg-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
} 