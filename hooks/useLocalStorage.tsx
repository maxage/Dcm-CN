import { useCallback, useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Use a ref to track if we've mounted yet
  const hasMounted = useRef(false);
  
  // Initialize state with initialValue to prevent hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  
  // Load from localStorage only after component mounts (client-side only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Only try to load from localStorage after first render
    if (!hasMounted.current) {
      hasMounted.current = true;
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const parsedValue = JSON.parse(item);
          setStoredValue(parsedValue);
        }
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
      }
    }
  }, [key]);
  
  // Save to localStorage whenever the value changes (after initial mount)
  useEffect(() => {
    if (typeof window === "undefined" || !hasMounted.current) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue };
} 