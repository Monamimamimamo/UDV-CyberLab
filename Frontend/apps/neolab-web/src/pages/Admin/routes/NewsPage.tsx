import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { NewsFilters } from '@/widgets/news-filters';
import { AdminNewsListWithQuery } from '@/widgets/admin-news-list/ui/AdminNewsListWithQuery';

const NewsPage = () => {
  return (
    <section className="mb-20 flex w-full max-w-[712px] flex-col gap-4">
      <NewsFilters withCreateButton />
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
