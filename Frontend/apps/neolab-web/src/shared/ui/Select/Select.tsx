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
      gray: {
        trigger:
          'group-data-[filled=true]:text-foreground bg-controls-primary data-[hover=true]:bg-controls',
        label: 'text-foreground',
        value: 'group-data-[has-value=true]:text-foreground',
        popoverContent: 'bg-controls-primary max-h-[190px]',
      },
      white: {
        trigger: 'group-data-[filled=true]:text-foreground bg-white data-[hover=true]:bg-controls',
        label: 'text-foreground',
        value: 'group-data-[has-value=true]:text-foreground',
        popoverContent: 'bg-white max-h-[190px]',
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
