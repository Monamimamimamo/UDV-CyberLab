import { QueryBoundary } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { AdminLearnMaterialsListWithQuery } from '@/widgets/admin-learn-materials-list';
import { LearnMaterialsFilters } from '@/widgets/learn-materials-filters';

const LearnMaterialsPage = () => {
  return (
    <section className="mb-20 flex w-full max-w-[712px] flex-col gap-4">
      <LearnMaterialsFilters withCreateButton />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <AdminLearnMaterialsListWithQuery />
      </QueryBoundary>
    </section>
  );
};

export default LearnMaterialsPage;
