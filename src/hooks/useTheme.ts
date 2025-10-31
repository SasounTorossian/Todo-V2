import { createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { COLOURS } from "../constants/colours";
import useLocalStorage from "./useLocalStorage";

const useTheme = () => {
  const [localStorage, setLocalStorage] = useLocalStorage("theme", "");
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return localStorage ? (localStorage as "light" | "dark") : "dark";
  });

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
        components: {
          MuiFormLabel: {
            styleOverrides: {
              asterisk: {
                color: COLOURS.red,
              },
            },
          },
        },
      }),
    [mode],
  );

  const switchMode = () => {
    return mode == "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    setLocalStorage(mode);
  }, [mode]);

  return {
    mode,
    theme,
    switchMode,
  };
};

export default useTheme;
