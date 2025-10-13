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
    breakpoints: { ...baseTheme.breakpoints, ...theme.breakpoints },
    colors: { ...baseTheme.colors, ...theme.colors },
    spacing: { ...baseTheme.spacing, ...theme.spacing },
    borderRadius: { ...baseTheme.borderRadius, ...theme.borderRadius },
    speed: { ...baseTheme.speed, ...theme.speed },
  };

  React.useEffect(() => {
    const root = document.documentElement;

    Object.entries(mergedTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color${key.capitalize?.()}`, value);
    });

    Object.entries(mergedTheme.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint${key.capitalize?.()}`, `${value}px`);
    });

    Object.entries(mergedTheme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing${key.capitalize?.()}`, value);
    });

    Object.entries(mergedTheme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--borderRadius${key.capitalize?.()}`, value);
    });

    Object.entries(mergedTheme.speed).forEach(([key, value]) => {
      root.style.setProperty(`--speed${key.capitalize?.()}`, value);
    });
  }, [mergedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: mergedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};
