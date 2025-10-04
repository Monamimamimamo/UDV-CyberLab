import {
  extendVariants,
  Input as InputNextUI,
  type InputProps as InputNextUIProps,
} from '@heroui/react';

export const Input = extendVariants(InputNextUI, {
  variants: {
    color: {
      default: {
        inputWrapper:
          'bg-controls data-[hover=true]:bg-[#CDCDE3] group-data-[focus=true]:bg-[#CDCDE3]',
        label: 'text-foreground',
        input:
          'placeholder:text-foreground focus:placeholder:text-[#A2A4C2] group-data-[has-value=true]:text-foreground !text-foreground',
      },
      white: {
        inputWrapper:
          'bg-controlsPrimary data-[hover=true]:bg-controls group-data-[focus=true]:bg-controls',
        label: 'text-foreground',
        input:
          'placeholder:text-foreground focus:placeholder:text-[#A2A4C2] group-data-[has-value=true]:text-foreground !text-foreground',
      },
    },
    variant: {
      bordered: {
        inputWrapper: 'border-gray',
      },
      underlined: {
        input: 'pb-0',
        inputWrapper:
          'pb-0 bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent border-b-[1px] shadow-none border-[#CDCDE3] !rounded-none hover:border-second after:bg-foreground ',
      },
    },
  },
  defaultVariants: {
    variant: 'flat',
    color: 'default',
    radius: 'sm',
    size: 'sm',
  },
});

type InputProps = Omit<InputNextUIProps, 'ref'>;

export type { InputProps };
