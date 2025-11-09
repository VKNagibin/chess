import { useTheme } from '@/shared/theme/ThemeProvider';
import { Theme } from '@/shared/theme/types';
import { useAppSelector } from '@/store/hooks';

export const useBreakpoints = (breakpoint: keyof Theme['breakpoints']) => {
  const { breakpoints } = useTheme();
  const appWidth = useAppSelector(({ app }) => app.appWidth);

  return breakpoints[breakpoint] > appWidth;
};
