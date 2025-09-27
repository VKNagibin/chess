import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import Cache from '@/services/Cache';
import i18n from '@/services/lang/i18n';

import AppProviders from './AppProviders';

Sentry.init({
  dsn: 'https://8bb5d6085da3726f7d33a42aafaf6fc3@o4509503585058816.ingest.us.sentry.io/4509503586107392',
  release: `${__APP__.name}@${__APP__.version}`,
});

const language = Cache.get('language');
if (language) i18n.changeLanguage(language);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
