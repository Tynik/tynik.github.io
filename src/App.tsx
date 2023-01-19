import React from 'react';
import { CssBaseline, Container, ThemeProvider, createTheme } from '@mui/material';

import { Main } from '~/Main';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container maxWidth={false}>
        <Main />
      </Container>
    </ThemeProvider>
  );
};

export default App;
