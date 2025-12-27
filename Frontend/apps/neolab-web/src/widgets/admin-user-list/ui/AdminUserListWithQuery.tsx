import { useSuspenseUsers } from '@/entities/admin';
import { AdminUserList } from './AdminUserList';

export const AdminUserListWithQuery = ({ search }: { search?: string }) => {
  const users = useSuspenseUsers({ search });

  return <AdminUserList users={users} />;
};
