import type { RouteObject } from 'react-router-dom';
import { DevelopmentPage } from '../Error';

export const materialsRoutes: RouteObject[] = [
  {
    path: '/education-materials',
    element: <DevelopmentPage />,
  },
];
