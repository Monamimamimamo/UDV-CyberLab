import { myTestRoutes, myTestTeacherRoutes, Topbar } from '@/widgets/topbar';
import { Outlet, useLocation } from 'react-router-dom';
import { Spinner, StickyElement } from '@/shared/ui';
import { useUserStatus } from '@/entities/user';
import { CreateTestButton } from '@/features/test-create-button';
import { useMediaQuery } from '@/shared/hooks';
import { QueryBoundary } from '@/shared/common/components';

export const MyTestLayout = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const { pathname } = useLocation();
  const { isTeacher } = useUserStatus();

  const withCreateButton = pathname === '/tests/my/created' && isTeacher;

  return (
    <div className="flex w-full max-w-[712px] flex-col gap-3">
      <StickyElement shadow={!isTablet} className="top-[75px] z-10">
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <Topbar links={isTeacher ? myTestTeacherRoutes : myTestRoutes} />
          <div className="bg-background mt-3 w-full self-end rounded-xl drop-shadow-md sm:w-auto">
            {withCreateButton && <CreateTestButton />}
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
      </QueryBoundary>
    </div>
  );
};
