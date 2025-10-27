import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { theme } from "./theme";

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  const md = theme.breakpoints.md;
  const lg = theme.breakpoints.lg;
  return useMemo(
    () => ({
      isMobile: width < md,
      isTablet: width >= md && width < lg,
      isDesktop: width >= lg || width >= md,
      width,
    }),
    [width, md, lg]
  );
}
