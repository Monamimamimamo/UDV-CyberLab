import { create } from 'zustand';

type ScrollStore = {
  scrollElement: HTMLElement | null;
  setScrollElement: (element: HTMLElement) => void;
  scrollToTop: () => void;
};

export const usePageScroll = create<ScrollStore>((set, get) => ({
  scrollElement: null,
  setScrollElement: (element) => set({ scrollElement: element }),
  scrollToTop: () => {
    const scrollElement = get().scrollElement;
    if (scrollElement) {
      scrollElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  },
}));
