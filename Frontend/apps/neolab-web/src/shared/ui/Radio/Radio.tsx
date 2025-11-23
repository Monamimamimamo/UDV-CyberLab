export { RadioGroup } from '@heroui/react';
import {
  extendVariants,
  Radio as RadioNextUI,
  type RadioProps,
} from '@heroui/react';

export const Radio = extendVariants(RadioNextUI, {
  variants: {
    color: {
      default: {
        base: 'text-foreground',
        wrapper:
          'border-second group-data-[hover-unselected=true]:bg-second/15 group-data-[selected=true]:border-foreground ',
        control: 'bg-foreground',
      },
    },
    size: {
      md: {
        label: 'text-[14.7px] leading-[20px]',
        control: 'w-[10px] h-[10px]',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export type { RadioProps };
