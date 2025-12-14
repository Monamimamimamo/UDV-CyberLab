import type { RouteObject } from 'react-router-dom';
import { LearnMaterialsPage, LearnMaterialsPreviewPage } from './routes';

export const materialsRoutes: RouteObject[] = [
  {
    children: [
      {
        path: '/learn-materials',
        element: <LearnMaterialsPage />,
      },
      {
        path: '/learn-materials/:materialId',
        element: <LearnMaterialsPreviewPage />,
      },
    ],
  },
];
