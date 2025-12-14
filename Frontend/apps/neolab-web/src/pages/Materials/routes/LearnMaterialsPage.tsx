import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { LearnMaterialsFilters } from '@/widgets/learn-materials-filters';
import { LearnMaterialsListWithQuery } from '@/widgets/learn-materials-list';

const LearnMaterialsPage = () => {
  return (
    <section className="mb-20 flex w-full flex-col gap-4">
      <LearnMaterialsFilters fullPage />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <LearnMaterialsListWithQuery />
      </QueryBoundary>
    </section>
  );
};

export default LearnMaterialsPage;
