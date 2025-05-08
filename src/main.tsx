import './lang/i18n';

import Modals from '@/components/Modals';
import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from '@/components/App/App';
import { GlobalStyles } from '@/global.styled';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
    {createPortal(<Modals />, document.body)}
  </React.StrictMode>,
);
