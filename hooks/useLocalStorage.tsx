"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use a ref to track if we've mounted yet
  const hasMounted = useRef(false)

  // Create a function to get the initial value from localStorage or use initialValue
  const getInitialValue = () => {
    if (typeof window === "undefined") return initialValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  }

  // Initialize state with a function to prevent re-computation on re-renders
  const [storedValue, setStoredValue] = useState<T>(getInitialValue)

  // Save to localStorage without triggering re-renders
  const saveToStorage = useCallback((value: T) => {
    if (typeof window === "undefined") return
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key])

  // Set up sync to localStorage only once after mount
  useEffect(() => {
    if (typeof window === "undefined") return
    
    if (!hasMounted.current) {
      hasMounted.current = true
    }
  }, [])

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        
        // Update state
        setStoredValue(valueToStore)
        
        // Update localStorage without causing additional re-renders
        saveToStorage(valueToStore)
      } catch (error) {
        console.error(`Error setting ${key} in localStorage:`, error)
      }
    },
    [key, storedValue, saveToStorage],
  )

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key)
      }
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }, [key, initialValue])

  return { value: storedValue, setValue, removeValue }
}
