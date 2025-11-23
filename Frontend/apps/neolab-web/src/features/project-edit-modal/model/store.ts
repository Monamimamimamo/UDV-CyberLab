import { createModalStore } from '@/shared/stores';

export const useProjectEditModal = createModalStore<{
  isEditing: boolean;
  projectId?: string;
}>();
