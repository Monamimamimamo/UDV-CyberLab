import {
  extendVariants,
  Modal as ModalNextUI,
  type ModalProps,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@heroui/react';

export const Modal = extendVariants(ModalNextUI, {
  variants: {
    color: {
      default: {
        closeButton: 'text-foreground',
      },
    },
    size: {
      lg: {
        base: 'max-w-[685px]',
        body: 'sm:p-[44px] pt-[38px] pb-[20px] px-[30px]',
        closeButton: 'text-[30px]',
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export type { ModalProps };
export { ModalContent, ModalHeader, ModalFooter, ModalBody };
