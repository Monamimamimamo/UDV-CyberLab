import { UserRole } from '@/shared/types';
import { create } from 'zustand';

type RoleSwitcherStore = {
  userRole: UserRole;
  setUserRole: (userRole: UserRole) => void;
};

export const useRoleSwitcher = create<RoleSwitcherStore>(set => ({
  userRole: UserRole.STUDENT,
  setUserRole: userRole => set({ userRole }),
}));
