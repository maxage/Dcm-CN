"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"

interface GradientButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
  external?: boolean
}

export function GradientButton({
  href,
  onClick,
  children,
  className,
  gradientFrom = "from-gray-500/20",
  gradientTo = "to-gray-400/20",
  external = false,
}: GradientButtonProps) {
  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          gradientFrom,
          gradientTo
        )}
      />
    </>
  )

  const buttonClasses = cn(
    "group relative overflow-hidden border-primary-foreground/30 bg-primary-foreground/15 px-4 py-2 font-medium text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/25 hover:shadow-lg motion-safe:animate-slide-in-right",
    className
  )

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        className={buttonClasses}
      >
        {buttonContent}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {buttonContent}
    </button>
  )
} 