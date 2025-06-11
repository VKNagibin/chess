import './lang/i18n';

import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/components/App/App';
import Modals from '@/components/Modals';
import { GlobalStyles } from '@/global.styled';
import { store } from '@/redux/store';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
      {createPortal(<Modals />, document.body)}
    </Provider>
  </React.StrictMode>,
);
