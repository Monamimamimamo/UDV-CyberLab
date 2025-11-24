import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { AdminNewsFilters } from '@/widgets/admin-news-filters';
import { NewsListWithQuery } from '@/widgets/news-list/ui/NewsListWithQuery';
import { useQueryState } from 'nuqs';

const NewsPage = () => {
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });

  return (
    <section className="mb-20 flex w-full flex-col gap-4">
      <AdminNewsFilters fullPage sort={sort} setSort={setSort} />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <NewsListWithQuery />
      </QueryBoundary>
    </section>
  );
};

export default NewsPage;
