import { Outlet, useLocation } from 'react-router-dom';
import { useQueryState } from 'nuqs';
import { Spinner, StickyElement } from '@/shared/ui';
import { useMediaQuery } from '@/shared/hooks';
import { QueryBoundary } from '@/shared/common/components';
import { ProjectSortingSelect } from '@/features/project-sorting-select';
import { CreateProjectButton } from '@/features/project-create-button';
import { ListFormatSwitcher } from '@/features/list-format-switcher';
import { ProjectEditModal, useProjectEditModal } from '@/features/project-edit-modal';

export const ProjectListLayout = () => {
  const open = useProjectEditModal((state) => state.open);
  const { pathname } = useLocation();
  const [sort, setSort] = useQueryState('sort', { defaultValue: '' });

  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <div className="flex w-full max-w-[712px] flex-col gap-3">
      <StickyElement shadow={!isTablet} className="top-[75px] z-10">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex w-full flex-row items-center gap-2">
            <div className="w-full sm:max-w-[234px]">
              <ProjectSortingSelect sort={sort} setSort={setSort} />
            </div>
            <div className="hidden sm:block">
              <ListFormatSwitcher />
            </div>
          </div>
          <div className="bg-background mt-3 w-full self-end rounded-xl drop-shadow-md sm:mt-0 sm:w-auto">
            {pathname === '/projects/my' && (
              <CreateProjectButton handleClick={() => open({ isEditing: false })} />
            )}
          </div>
        </div>
      </StickyElement>
      <QueryBoundary
        fallbackLoader={
          <div className="mt-20 flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <Outlet />
        <ProjectEditModal />
      </QueryBoundary>
    </div>
  );
};
