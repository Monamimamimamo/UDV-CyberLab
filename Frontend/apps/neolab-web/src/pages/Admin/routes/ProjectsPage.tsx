import { QueryBoundary, StickySearch } from '@/shared/common/components';
import { Spinner } from '@/shared/ui';
import { AdminProjectListWithQuery } from '@/widgets/admin-project-list';
import { useQueryState } from 'nuqs';

const ProjectsPage = () => {
  const [search] = useQueryState('search', { defaultValue: '' });

  return (
    <section className="mb-20 flex w-full max-w-[712px] flex-col gap-4">
      <StickySearch placeholder="Поиск проекта..." />
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <AdminProjectListWithQuery search={search} />
      </QueryBoundary>
    </section>
  );
};

export default ProjectsPage;
