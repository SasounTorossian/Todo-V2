import { useEffect, useState } from "react";
import type { Task } from "../types/task";

const useLocalStorage = (key: string, defaultValue: Task[]) => {
  const parseDate = (key: string, value: string) => {
    return key === "created_at" || key === "due_date"
      ? new Date(Date.parse(value))
      : value;
  };

  const [value, setValue] = useState(() => {
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
