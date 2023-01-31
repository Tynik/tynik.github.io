import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '~/App';
import { AppProvider } from '~/providers';

const appContainer = document.getElementById('app');
if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);

  root.render(
    <AppProvider>
      <App />
    </AppProvider>
  );
}
