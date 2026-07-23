import { useCallback, useState } from "react";
import { loadFromStorage, saveToStorage } from "../lib/storage";

export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => loadFromStorage(key, fallback));

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        saveToStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update];
}
