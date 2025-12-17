import { createModalStore } from '@/shared/stores';

export const useNewsRatingModal = createModalStore<{ newsId: string }>();

