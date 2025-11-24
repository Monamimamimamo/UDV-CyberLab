import type { RouteObject } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { DevelopmentPage } from '../Error';
import {
  NewsCreatePage,
  NewsEditPage,
  NewsPage,
  NewsPreviewPage,
  ProjectsPage,
  UsersPage,
} from './routes';

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
        path: '/admin',
        children: [
          {
            path: '/admin/news',
            element: <NewsPage />,
          },
          {
            path: '/admin/news/create',
            element: <NewsCreatePage />,
          },
          {
            path: '/admin/news/:newsId',
            element: <NewsPreviewPage />,
          },
          {
            path: '/admin/news/:newsId/edit',
            element: <NewsEditPage />,
          },
        ],
      },
      {
        path: '/admin/education-materials',
        element: <DevelopmentPage />,
      },
    ],
  },
];
