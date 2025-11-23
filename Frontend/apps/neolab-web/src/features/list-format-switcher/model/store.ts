import { create } from 'zustand';

type ListFormat = 'grid' | 'rows';

interface ListFormatState {
  format: ListFormat;
  setFormat: (type: ListFormat) => void;
}

const KEY = 'project-list-type';

const initialType = (localStorage.getItem(KEY) as ListFormat) || 'grid';

export const useListFormat = create<ListFormatState>(set => ({
  format: initialType,
  setFormat: format => {
    localStorage.setItem(KEY, format);
    set({ format });
  },
}));
