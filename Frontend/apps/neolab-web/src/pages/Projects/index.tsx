import type { RouteObject } from 'react-router-dom';
import { MyProjectsPage, ProjectPreviewPage, ProjectsPage } from './routes';
import { ProjectLayout } from './layouts/ProjectLayout';
import { ProjectListLayout } from './layouts';

export const projectsRoutes: RouteObject[] = [
  {
    element: <ProjectLayout />,
    children: [
      {
        element: <ProjectListLayout />,
        children: [
          {
            path: '/projects',
            element: <ProjectsPage />,
          },
          {
            path: '/projects/my',
            element: <MyProjectsPage />,
          },
        ],
      },
      {
        path: '/projects/:projectId',
        element: <ProjectPreviewPage />,
      },
    ],
  },
];
