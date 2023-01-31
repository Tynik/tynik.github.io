import React from 'react';
import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

import { UserProvider } from '~/providers';

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const globalStyles = {
  'html, body': {
    height: '100%',
    overflow: 'hidden',
  },
  '#app': {
    height: '100%',
  },
};

type AppProviderProps = PropsWithChildren;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <GlobalStyles styles={globalStyles} />

        <QueryClientProvider client={queryClient}>
          <UserProvider>{children}</UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
