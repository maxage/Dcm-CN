"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use a ref to track if we've mounted yet
  const hasMounted = useRef(false)

  // Initialize state with initialValue to prevent hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage only after component mounts (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return

    // Only try to load from localStorage after first render
    if (!hasMounted.current) {
      hasMounted.current = true
      try {
        const item = localStorage.getItem(key)
        if (item) {
          const parsedValue = JSON.parse(item)
          setStoredValue(parsedValue)
        }
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error)
      }
    }
  }, [key])

  // Save to localStorage explicitly rather than on every state change
  const saveToStorage = useCallback((value: T) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key])

  const setValue = useCallback(
    (value: T | ((val: T) => T), saveImmediately = true) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        
        // Only update state and storage when needed
        setStoredValue((prevValue) => {
          const newValue = valueToStore;
          
          // Only save to localStorage if explicitly requested and value changed
          if (saveImmediately && JSON.stringify(newValue) !== JSON.stringify(prevValue)) {
            saveToStorage(newValue)
          }
          
          return newValue;
        });
      } catch (error) {
        console.error(`Error setting ${key} in localStorage:`, error)
      }
    },
    [key, saveToStorage],
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

  return { 
    value: storedValue, 
    setValue, 
    saveToStorage,
    removeValue 
  }
}
