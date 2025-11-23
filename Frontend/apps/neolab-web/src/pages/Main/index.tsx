import type { RouteObject } from 'react-router-dom';
import { MainPage } from './routes/MainPage';

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
  },
];
