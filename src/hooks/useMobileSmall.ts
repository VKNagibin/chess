import { useAppWidth } from '@/hooks/useResizeApp';
import { useTheme } from '@/shared/theme/ThemeProvider';

export const useMobileSmall = () => {
  const { breakpoints } = useTheme();

  const width = useAppWidth();

  return breakpoints.mobileSmall > width;
};
