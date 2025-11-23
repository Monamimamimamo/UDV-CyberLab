import {
  extendVariants,
  Spinner as SpinnerNextUI,
  type SpinnerProps,
} from '@heroui/react';

export const Spinner = extendVariants(SpinnerNextUI, {
  variants: {
    color: {
      primary: {
        circle1: 'border-b-foreground',
        circle2: 'border-b-foreground/60',
      },
    },
    size: {
      lg: {
        wrapper: 'h-12 w-12',
      },
    },
  },
});

export type { SpinnerProps };
