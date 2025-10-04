import { convertEditTestTypeToString, useEditTestNavigation } from '@/features/test-edit-nav';
import { QueryBoundary } from '@/shared/common/components';
import { useMediaQuery } from '@/shared/hooks';
import { Spinner, StickyElement } from '@/shared/ui';
import { manageTestRoutes, Topbar } from '@/widgets/topbar';
import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export const ManageTestLayout = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const navType = useEditTestNavigation((state) => state.navType);
  // const { pathname } = useLocation();
  const { testId = '' } = useParams();

  const topbarList = useMemo(
    () =>
      manageTestRoutes.map(({ path, enabledList, ...rest }) => ({
        ...rest,
        path: path.replace(':id', testId).replace('custom', convertEditTestTypeToString(navType)),
        enabledList: enabledList.map((item) => item.replace(':id', testId)),
      })),
    [testId, navType],
  );

  // const withEditSelect = pathname.includes(`/tests/manage/${testId}/edit`);

  return (
    <div className="w-full max-w-[712px]">
      <StickyElement shadow={!isTablet} className="top-[75px] z-[20]">
        <div className="mb-3 flex flex-col items-start justify-between gap-3">
          <Topbar links={topbarList} />
          {/* TODO_1 Вернуть когда будет реализовано создание теста из базы и генерация теста */}
          {/* {withEditSelect && <EditTestSelect />} */}
        </div>
      </StickyElement>

      <QueryBoundary
        fallbackLoader={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <Outlet />
      </QueryBoundary>
    </div>
  );
};
