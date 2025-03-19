import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets a CSS variable value from the document
 * @param variable - CSS variable name (without the -- prefix)
 * @param defaultValue - Default value to use if the variable is not found
 * @returns The computed CSS variable value
 */
export function getCssVar(variable: string, defaultValue: string = ''): string {
  if (typeof window === 'undefined') return defaultValue
  
  // Get the variable from :root or body
  const rootStyles = getComputedStyle(document.documentElement)
  const value = rootStyles.getPropertyValue(`--${variable}`).trim()
  
  return value || defaultValue
}

/**
 * Gets Tailwind CSS color with specified opacity
 * @param colorVar - Color variable name (e.g., 'background')
 * @param opacity - Opacity value (0-100)
 * @returns HSL color string
 */
export function getTailwindHsl(colorVar: string, opacity: number = 100): string {
  if (typeof window === 'undefined') return ''
  
  const value = getCssVar(colorVar)
  if (!value) return ''
  
  // If the value is already in HSL format
  if (value.includes('hsl')) return value

  // Handle Tailwind format "210 40% 96.1%"
  // Convert to HSL with opacity
  return `hsla(${value}, ${opacity/100})`
}
