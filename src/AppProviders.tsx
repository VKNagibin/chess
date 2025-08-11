import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

import ModalProvider from './shared/components/Modal/ModalProvider';

const AppProviders = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <ModalProvider>{children}</ModalProvider>
  </Provider>
);

export default AppProviders;
