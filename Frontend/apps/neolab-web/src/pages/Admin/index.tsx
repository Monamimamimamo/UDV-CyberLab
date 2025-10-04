import type { RouteObject } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { DevelopmentPage } from '../Error';
import { ProjectsPage, UsersPage } from './routes';

export const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <UsersPage />,
      },
      {
        path: '/admin/users',
        element: <UsersPage />,
      },
      {
        path: '/admin/projects',
        element: <ProjectsPage />,
      },
      {
        path: '/admin/tests',
        element: <DevelopmentPage />,
      },
      {
        path: '/admin/news',
        element: <DevelopmentPage />,
      },
      {
        path: '/admin/education-materials',
        element: <DevelopmentPage />,
      },
    ],
  },
];
