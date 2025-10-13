import { Theme } from './types';

export const baseTheme: Theme = {
  colors: {
    primary: 'rgb(231 212 186)',
    primaryDim: 'rgb(166 139 101 / 56%)',
    primarySoft: 'rgb(250 235 215)',
    secondary: 'rgb(72 49 22 / 72%)',
    selected: 'rgb(129 167 245 / 91%)',
    danger: 'rgb(208 44 15)',
    warning: 'yellow',
    success: 'rgb(164 255 200)',
    darkTypography: 'rgb(42 26 12 / 90%)',
    brightTypography: 'rgb(250 235 215)',
    border: 'rgb(84 68 53)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  speed: {
    1: '.1s',
    2: '.2s',
    3: '.3s',
    4: '3s',
  },
  breakpoints: {
    mobileSmall: 320,
    mobileMedium: 375,
    mobileLarge: 425,
    tablet: 768,
    laptop: 1024,
    desktop: 1440,
    desktopLarge: 2560,
  },
};
