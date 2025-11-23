import { Outlet } from 'react-router-dom';
import { Sidebar, projectRoutes } from '@/widgets/sidebar';
import { Spinner } from '@/shared/ui';
import { QueryBoundary, LayoutWithSidebar } from '@/shared/common/components';

export const ProjectLayout = () => {
  return (
    <LayoutWithSidebar sidebarSlot={<Sidebar links={projectRoutes} withLogout />}>
      <QueryBoundary
        fallbackLoader={
          <div className="flex w-full items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        }
      >
        <Outlet />
      </QueryBoundary>
    </LayoutWithSidebar>
  );
};
