import type { RouteObject } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { DevelopmentPage } from '../Error';
import {
  LearnMaterialsCreatePage,
  LearnMaterialsEditPage,
  LearnMaterialsPage,
  LearnMaterialsPreviewPage,
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
        path: '/admin',
        children: [
          {
            path: '/admin/learn-materials',
            element: <LearnMaterialsPage />,
          },
          {
            path: '/admin/learn-materials/create',
            element: <LearnMaterialsCreatePage />,
          },
          {
            path: '/admin/learn-materials/:materialId',
            element: <LearnMaterialsPreviewPage />,
          },
          {
            path: '/admin/learn-materials/:materialId/edit',
            element: <LearnMaterialsEditPage />,
          },
        ],
      },
    ],
  },
];
