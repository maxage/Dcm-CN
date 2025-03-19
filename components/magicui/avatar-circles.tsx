/* eslint-disable @next/next/no-img-element */
"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { DockerTool } from "@/lib/docker-tools"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ServiceCirclesProps {
  className?: string
  selectedServices: DockerTool[]
  onToggleServiceSelection?: (serviceId: string) => void
  /** Spacing between service icons, defaults to -space-x-4 */
  spacing?: string
}

export const ServiceCircles = ({ 
  className, 
  selectedServices, 
  onToggleServiceSelection,
  spacing = "-space-x-4" 
}: ServiceCirclesProps) => {
  const [open, setOpen] = useState(false)
  const displayedServices = selectedServices.slice(0, 9) // Show first 9 services
  const remainingServices = selectedServices.slice(9) // Store the rest for the popover
  const numRemaining = remainingServices.length

  return (
    <div className={cn("flex rtl:space-x-reverse z-10", spacing, className)}>
      {displayedServices.map((service) => (
        <div key={service.id} className="cursor-pointer group relative select-none">
          <div className="block relative">
            <img
              className="bg-primary-foreground border-2 border-white dark:border-gray-800 duration-200 ring-primary/50 ring-1 group-hover:ring-2 group-hover:ring-primary group-hover:scale-110 group-hover:z-10 h-10 p-0.5 rounded-full transition-all w-10"
              src={service.icon || "/placeholder.svg"}
              width={40}
              height={40}
              alt={`Icon of ${service.name}`}
              onClick={() => onToggleServiceSelection?.(service.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onToggleServiceSelection?.(service.id)
                }
              }}
              tabIndex={0}
              role="button"
            />
            <div className="-translate-x-1/2 absolute bg-black/80 bottom-full dark:bg-white/80 dark:text-black group-hover:opacity-100 left-1/2 mb-2 opacity-0 pointer-events-none px-2 py-1 rounded text-white text-xs transition-opacity whitespace-nowrap">
              {service.name}
            </div>
          </div>
        </div>
      ))}

      {numRemaining > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="z-10 bg-black border-2 border-white dark:border-gray-800 dark:bg-white dark:text-black duration-200 flex h-10 hover:bg-gray-600 hover:ring-2 hover:ring-primary hover:scale-110 hover:z-10 items-center justify-center rounded-full text-center text-white text-xs transition-all w-10"
            >
              +{numRemaining}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="max-h-60 overflow-y-auto p-2 w-48"
            align="center"
            side="top"
          >
            <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100 text-sm">More services</h3>
            <ul className="space-y-1">
              {remainingServices.map((service) => (
                <li
                  key={service.id}
                  className="cursor-pointer flex gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 items-center p-1 rounded select-none"
                  onClick={() => onToggleServiceSelection?.(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onToggleServiceSelection?.(service.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <img
                    className="h-6 rounded-full w-6"
                    src={service.icon || "/placeholder.svg"}
                    width={24}
                    height={24}
                    alt={`Icon of ${service.name}`}
                  />
                  <span className="dark:text-gray-200 text-gray-800 text-xs">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

