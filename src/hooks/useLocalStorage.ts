import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const parseDate = (key: string, value: string) => {
    return key === "created_at" || key === "due_date"
      ? new Date(Date.parse(value))
      : value;
  };

  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored, parseDate) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.log("local storage unavailable");
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
