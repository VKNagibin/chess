import '@/utils/overrides/string.ts';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import Cache from '@/services/Cache';
import i18n from '@/services/lang/i18n';

import AppProviders from './AppProviders';

const language = Cache.get('language');
if (language) i18n.changeLanguage(language);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
