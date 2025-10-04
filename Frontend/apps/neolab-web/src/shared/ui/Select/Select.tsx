export { SelectItem } from '@heroui/react';
import {
  extendVariants,
  Select as SelectNextUI,
  type SelectProps as SelectHeroUIProps,
} from '@heroui/react';

export const Select = extendVariants(SelectNextUI, {
  variants: {
    variant: {
      flat: {
        trigger:
          'group-data-[filled=true]:text-foreground bg-controls data-[hover=true]:bg-[#CDCDE3] duration-200 text-foreground',
        label: 'text-foreground',
        value: 'group-data-[has-value=true]:text-foreground',
        popoverContent: 'bg-controls max-h-[190px]',
      },
    },
    color: {
      secondary: {
        trigger: 'group-data-[filled=true]:text-foreground bg-secondary',
        label: 'text-foreground',
        value: 'group-data-[has-value=true]:text-foreground',
        popoverContent: 'bg-secondary max-h-[190px]',
      },
      white: {
        trigger:
          'group-data-[filled=true]:text-foreground bg-controlsPrimary data-[hover=true]:bg-controls',
        label: 'text-foreground',
        value: 'group-data-[has-value=true]:text-foreground',
        popoverContent: 'bg-controlsPrimary max-h-[190px]',
      },
    },
    radius: {
      sm: {
        trigger: 'rounded-small',
        popoverContent: 'rounded-small',
      },
    },
  },
  defaultVariants: {
    variant: 'flat',
    radius: 'sm',
  },
});

type SelectProps = Omit<SelectHeroUIProps, 'ref'>;

export type { SelectProps };
