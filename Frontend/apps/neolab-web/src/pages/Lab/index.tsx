import type { RouteObject } from 'react-router-dom';
import { DevelopmentPage } from '../Error';

export const labsRoutes: RouteObject[] = [
  {
    path: '/labs',
    element: <DevelopmentPage />,
  },
];
