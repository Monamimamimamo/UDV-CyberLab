import { create } from 'zustand';

interface LogoutModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
}

export const useLogoutModal = create<LogoutModalStore>(set => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setOpen: isOpen => set({ isOpen }),
}));
