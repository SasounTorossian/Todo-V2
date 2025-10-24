import type { Theme } from "@mui/material/styles";
import { createContext, useContext } from "react";

interface ThemeContextInterface {
  mode: "light" | "dark";
  theme: Theme;
  switchMode: () => void;
}

export const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined,
);

export const useThemeContext = (): ThemeContextInterface => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a TasksProvider");
  }

  return context;
};
