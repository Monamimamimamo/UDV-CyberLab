import { create } from 'zustand';

interface ModalStore<T> {
  isOpen: boolean;
  open: (options?: T) => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
  options: T | null;
  setOptions: (options: T) => void;
}

export const createModalStore = <T>() =>
  create<ModalStore<T>>(set => ({
    isOpen: false,
    open: options => set({ isOpen: true, options: options ?? null }),
    close: () => set({ isOpen: false, options: null }),
    setOpen: isOpen => set({ isOpen }),
    options: null,
    setOptions: options => set({ options }),
  }));
