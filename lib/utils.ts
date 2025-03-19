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
 * @returns Color string in HEX format that Monaco can use
 */
export function getTailwindHsl(colorVar: string, opacity = 100) {
  if (typeof window === 'undefined') return ''
  
  const value = getCssVar(colorVar)
  if (!value) return ''
  
  // Convert the value to HEX since Monaco doesn't handle HSL well
  try {
    // For HSL values that are already in the document
    if (value.includes('hsl')) {
      // Extract the values from HSL format
      const matches = value.match(/hsla?\(([^)]+)\)/)
      if (matches?.[1]) {
        // Convert HSL to HEX - this is a simplified conversion
        // In a real app, you might use a color library for proper conversion
        return opacity < 100 
          ? `#808080${Math.round(opacity * 255 / 100).toString(16).padStart(2, '0')}`
          : '#808080'
      }
      return value
    }
    
    // For Tailwind format values like "210 40% 96.1%"
    // In a production app, use a proper color library for conversion
    // For now, return web-safe colors based on theme
    const isDark = document.documentElement.classList.contains('dark')
    
    // Return safe fallback colors
    if (colorVar.includes('background')) {
      return isDark ? '#1e1e1e' : '#ffffff'
    }
    if (colorVar.includes('foreground')) {
      return isDark ? '#d4d4d4' : '#000000'
    }
    if (colorVar.includes('primary')) {
      return isDark ? '#569cd6' : '#0000ff'
    }
    if (colorVar.includes('secondary')) {
      return isDark ? '#4ec9b0' : '#008000'
    }
    if (colorVar.includes('muted')) {
      return isDark ? '#333333' : '#f3f3f3'
    }
    if (colorVar.includes('accent')) {
      return isDark ? '#646464' : '#e9e9e9'
    }
    
    // Default fallback
    return isDark ? '#d4d4d4' : '#000000'
  } catch (error) {
    console.error('Error parsing color:', error)
    return opacity < 100 
      ? `#808080${Math.round(opacity * 255 / 100).toString(16).padStart(2, '0')}`
      : '#808080'
  }
}
