import '@/services/lang/i18n';

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

import ModalProvider from './shared/components/Modal/ModalProvider';
import { ThemeProvider } from './shared/theme/ThemeProvider';

const AppProviders = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <Provider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </Provider>
  </ThemeProvider>
);

export default AppProviders;
