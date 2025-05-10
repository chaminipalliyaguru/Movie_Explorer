// src/context/ThemeContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ColorModeContext = createContext();

export const useColorMode = () => {
  return useContext(ColorModeContext);
};

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode,
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f5f5f5",
                },
              }
            : {
                background: {
                  default: "#121212",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// ✅ Fix: export correctly
export default ThemeContextProvider;
