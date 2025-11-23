import { createModalStore } from '@/shared/stores';

export const useDeleteProjectModal = createModalStore<{
  projectId: string;
  ownerName: string;
  name: string;
}>();
