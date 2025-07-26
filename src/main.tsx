import './services/lang/i18n';

import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/components/App/App';
import ModalProvider from '@/shared/components/Modal/ModalProvider';
import { store } from '@/store';

import packageJson from '../package.json';

Sentry.init({
  dsn: 'https://8bb5d6085da3726f7d33a42aafaf6fc3@o4509503585058816.ingest.us.sentry.io/4509503586107392',
  release: `${packageJson.name}@${packageJson.version}`,
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
);
