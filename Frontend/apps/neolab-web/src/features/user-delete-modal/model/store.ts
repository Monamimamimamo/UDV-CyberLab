import { createModalStore } from '@/shared/stores';
import type { UserInfo } from '@/shared/types';

export const useDeleteUserModal = createModalStore<UserInfo>();
