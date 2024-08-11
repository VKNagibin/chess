import './lang/i18n';

import Modals from '@components/Modals';
import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';

import App from '@/components/App/App';
import { GlobalStyles } from '@/global.styled';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
    {createPortal(<Modals />, document.body)}
  </React.StrictMode>,
  document.getElementById('root'),
);
