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
export function getTailwindHsl(colorVar: string, opacity = 100) {
  if (typeof window === 'undefined') return ''
  
  const value = getCssVar(colorVar)
  if (!value) return ''
  
  // If the value is already in HSL format, convert it to the comma-separated format
  if (value.includes('hsl')) {
    // Extract the values and return in comma-separated format
    const matches = value.match(/hsla?\(([^)]+)\)/)
    if (matches && matches[1]) {
      const parts = matches[1].split(' ')
      return `hsla(${parts.join(', ')}, ${opacity/100})`
    }
    return value
  }

  // Handle Tailwind format "210 40% 96.1%"
  // Convert to HSL with opacity using comma-separated format
  try {
    // Split by spaces and get the hue, saturation, and lightness parts
    const parts = value.split(' ')
    
    if (parts.length >= 3) {
      // For Tailwind format, combine the parts with commas
      return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity/100})`
    }
  } catch (error) {
    console.error('Error parsing HSL color:', error)
  }
  
  // Fallback to a safe neutral color
  return opacity < 100 ? `rgba(128, 128, 128, ${opacity/100})` : '#808080'
}
