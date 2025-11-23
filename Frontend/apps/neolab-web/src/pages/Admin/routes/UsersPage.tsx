import { UserDeleteModal } from '@/features/user-delete-modal';
import { QueryBoundary, StickySearch } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { AdminUserListWithQuery } from '@/widgets/admin-user-list';
import { useQueryState } from 'nuqs';

const UsersPage = () => {
  const [search] = useQueryState('search', { defaultValue: '' });

  return (
    <section className="mb-20 flex w-full max-w-[712px] flex-col gap-4">
      <StickySearch placeholder="Поиск пользователя..." />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <AdminUserListWithQuery search={search} />
      </QueryBoundary>

      <UserDeleteModal />
    </section>
  );
};

export default UsersPage;
