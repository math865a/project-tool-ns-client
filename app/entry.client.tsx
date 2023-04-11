import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterLuxon } from '@mui/x-date-pickers-pro/AdapterLuxon';
import * as React from 'react';
import { useState } from 'react';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {theme, createEmotionCache, ClientStylesContext} from "mui-config"

interface ClientCacheProviderProps {
  children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = React.useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );


  return (
    <ClientStylesContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStylesContext.Provider>
  );
}

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="da">
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
   
          <RemixBrowser />
          </LocalizationProvider>
        </ThemeProvider>
      </ClientCacheProvider>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
/*
import { CacheProvider } from '@emotion/react';
import { createEmotionCache, theme } from 'mui-config';
import { ThemeProvider } from '@mui/material/styles';
import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterLuxon } from '@mui/x-date-pickers-pro/AdapterLuxon';
const emotionCache = createEmotionCache();
function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,

            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <RemixBrowser />
                    </LocalizationProvider>
                </ThemeProvider>
            </CacheProvider>
        );
    });
}

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    window.setTimeout(hydrate, 1);
}
*/