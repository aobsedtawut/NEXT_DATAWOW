import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage initially
  const storedValue = () => {
    try {
      if (typeof window !== "undefined" && localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(error);
    }
    return initialValue;
  };

  const [value, setValue] = useState<T>(storedValue);

  useEffect(() => {
    // Set up an event listener for changes to the local storage value
    // outside of this hook's context (e.g., from another tab).
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        setValue(JSON.parse(e.newValue || "null"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const setStoredValue = (newValue: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(error);
    }
  };

  const removeStoredValue = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStoredValue, removeStoredValue] as const;
}

export default useLocalStorage;
