import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { AdminNewsFilters } from '@/widgets/admin-news-filters';
import { AdminNewsListWithQuery } from '@/widgets/admin-news-list/ui/AdminNewsListWithQuery';
import { useQueryState } from 'nuqs';

const NewsPage = () => {
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });

  return (
    <section className="mb-20 flex w-full max-w-[712px] flex-col gap-4">
      <AdminNewsFilters withCreateButton sort={sort} setSort={setSort} />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <AdminNewsListWithQuery />
      </QueryBoundary>
    </section>
  );
};

export default NewsPage;
