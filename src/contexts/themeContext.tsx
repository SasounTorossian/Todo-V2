import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import useTheme from "../hooks/useTheme";
import { ThemeContext } from "../hooks/useThemeContext";

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeHook = useTheme();

  return (
    <ThemeContext.Provider value={themeHook}>
      <ThemeProvider theme={themeHook.theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
