import { createModalStore } from '@/shared/stores';

export const useProjectRatingModal = createModalStore<{ projectId: string }>();
