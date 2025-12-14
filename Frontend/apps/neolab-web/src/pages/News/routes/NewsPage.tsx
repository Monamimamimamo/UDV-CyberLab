import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { NewsFilters } from '@/widgets/news-filters';
import { NewsListWithQuery } from '@/widgets/news-list/ui/NewsListWithQuery';

const NewsPage = () => {
  return (
    <section className="mb-20 flex w-full flex-col gap-4">
      <NewsFilters fullPage />
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
