"use client"
import Notify from "../helper/decoration/Notify";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from '../styles/theme/theme';
import { DataProvider } from "../store/GlobaStore";
import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";

export default function Providers({children}) {
  const emotionCache = createEmotionCache();
  return (
        <CacheProvider value={emotionCache}>
          <SessionProvider>
            <DataProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
                <Notify />
              </ThemeProvider>
            </DataProvider>
          </SessionProvider>
        </CacheProvider>
  );
}