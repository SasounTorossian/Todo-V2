import { createTheme } from "@mui/material";
import { useMemo, useState } from "react";

const useTheme = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" && {
            background: {
              default: "#f0f1f3",
              paper: "#fafafa",
            },
            primary: {
              main: "#3b82f6",
            },
          }),
        },
        shape: { borderRadius: 8 },
        typography: {
          fontFamily: "Inter, Roboto, sans-serif",
        },
      }),
    [mode],
  );

  const switchMode = () => {
    return mode == "light" ? setMode("dark") : setMode("light");
  };

  return {
    mode,
    theme,
    switchMode,
  };
};

export default useTheme;
