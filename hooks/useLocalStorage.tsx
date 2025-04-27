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
        const item = window.localStorage.getItem(key)
        if (item) {
          const parsedValue = JSON.parse(item)
          setStoredValue(parsedValue)
        }
      } catch (error) {
        console.error(`从本地存储加载 ${key} 时出错:`, error)
      }
    }
  }, [key])

  // Save to localStorage whenever the value changes (after initial mount)
  useEffect(() => {
    if (typeof window === "undefined" || !hasMounted.current) return

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`保存 ${key} 到本地存储时出错:`, error)
    }
  }, [key, storedValue])

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`保存 ${key} 到本地存储时出错:`, error)
      }
    },
    [key, storedValue],
  )

  const setValueDirect = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`设置 ${key} 到本地存储时出错:`, error)
      }
    },
    [key],
  )

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`从本地存储删除 ${key} 时出错:`, error)
    }
  }, [key, initialValue])

  return { value: storedValue, setValue, setValueDirect, removeValue }
}
