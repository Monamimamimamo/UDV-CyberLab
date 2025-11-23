import { LogoutModal } from '@/features/logout-modal';
import { PageScrollbar } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <PageScrollbar>
      <div className='min-h-svh'>
        <Header />
        <div className='container'>
          <Outlet />
        </div>
      </div>

      <LogoutModal />
    </PageScrollbar>
  );
};

export default AppLayout;
