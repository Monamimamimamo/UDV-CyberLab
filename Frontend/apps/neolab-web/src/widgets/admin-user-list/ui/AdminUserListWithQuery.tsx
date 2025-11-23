import { useUserList } from '@/entities/admin';
import { AdminUserList } from './AdminUserList';

export const AdminUserListWithQuery = ({ search }: { search?: string }) => {
  const { data } = useUserList({ search });

  return <AdminUserList users={data} />;
};
