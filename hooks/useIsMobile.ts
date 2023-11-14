import { getBreakpointValue, MantineSize, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useIsMobile(options?: { breakpoint: MantineSize }) {
  const theme = useMantineTheme();
  const { breakpoint = 'sm' } = options || {};
  return useMediaQuery(`(max-width: ${getBreakpointValue(theme.breakpoints[breakpoint], theme) - 1}px)`, false, {
    getInitialValueInEffect: false,
  });
}
