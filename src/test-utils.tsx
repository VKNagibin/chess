import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

import AppProviders from '@/AppProviders';

export const renderUI = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'queries'> | undefined,
) => render(ui, { wrapper: AppProviders, ...options });

export * from '@testing-library/react';
