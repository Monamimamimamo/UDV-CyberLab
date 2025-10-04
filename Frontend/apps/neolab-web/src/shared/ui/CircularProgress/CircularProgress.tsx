import {
  extendVariants,
  CircularProgress as CircularProgressNextUI,
  type CircularProgressProps,
} from '@heroui/react';

export const CircularProgress = extendVariants(CircularProgressNextUI, {
  variants: {
    color: {
      default: {
        track: 'stroke-background',
        svg: 'text-foreground',
      },
    },
    size: {
      lg: {
        value: 'text-[15px] font-medium',
      },
      md: {
        value: 'text-[14px] font-medium',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export type { CircularProgressProps };
