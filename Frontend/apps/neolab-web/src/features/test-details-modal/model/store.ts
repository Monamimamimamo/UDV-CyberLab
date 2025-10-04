import { createModalStore } from '@/shared/stores';

export const useTestDetailsModalStore = createModalStore<{
  testId: string;
}>();
