import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '~/App';

const appContainer = document.getElementById('app');
if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(<App />);
}
