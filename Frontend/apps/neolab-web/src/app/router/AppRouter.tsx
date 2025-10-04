import { lazy } from 'react';
import {
  mainRoutes,
  authRoutes,
  testRoutes,
  projectsRoutes,
  eventsRoutes,
  labsRoutes,
  materialsRoutes,
  adminRoutes,
} from '@/pages';
import { AuthGuard, NoAuthGuard } from './guards';
import { useRoutes } from 'react-router-dom';
import { NotFoundPage } from '@/pages/Error';
import { AdminGuard } from './guards/AdminGuard';

const AppLayout = lazy(() => import('./AppLayout'));

const routes = [
  {
    element: <NoAuthGuard />,
    children: [...authRoutes],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          ...mainRoutes,
          ...testRoutes,
          ...projectsRoutes,
          ...eventsRoutes,
          ...labsRoutes,
          ...materialsRoutes,
          {
            element: <AdminGuard />,
            children: [...adminRoutes],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const AppRouter = () => useRoutes(routes);
