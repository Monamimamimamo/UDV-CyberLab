import type { RouteObject } from 'react-router-dom';
import { DevelopmentPage } from '../Error';

export const eventsRoutes: RouteObject[] = [
  {
    path: '/events',
    element: <DevelopmentPage />,
  },
];
