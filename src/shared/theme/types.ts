export interface Theme {
  colors: {
    primary: string;
    primarySoft: string;
    primaryDim: string;
    secondary: string;
    darkTypography: string;
    brightTypography: string;
    border: string;
    selected: string;
    overlay: string;
    danger: string;
    warning: string;
    success: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  speed: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
  breakpoints: {
    mobileSmall: number;
    mobileMedium: number;
    mobileLarge: number;
    tablet: number;
    laptop: number;
    desktop: number;
    desktopLarge: number;
    [key: string]: number;
  };
}
