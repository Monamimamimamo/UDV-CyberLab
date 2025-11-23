import { create } from 'zustand';
import { EditTestNavigation } from './types';

type EditTestState = {
  navType: EditTestNavigation;
  setNavType: (type: EditTestNavigation) => void;
};

export const useEditTestNavigation = create<EditTestState>(set => ({
  navType: EditTestNavigation.CUSTOM,
  setNavType: type => set({ navType: type }),
}));
