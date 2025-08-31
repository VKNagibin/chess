import React, { createContext, useContext } from 'react';

import { baseTheme } from './baseTheme';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: baseTheme,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = {} }) => {
  const mergedTheme: Theme = {
    ...baseTheme,
    ...theme,
    colors: { ...baseTheme.colors, ...theme.colors },
    spacing: { ...baseTheme.spacing, ...theme.spacing },
    borderRadius: { ...baseTheme.borderRadius, ...theme.borderRadius },
  };

  React.useEffect(() => {
    const root = document.documentElement;

    Object.entries(mergedTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    Object.entries(mergedTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    Object.entries(mergedTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
