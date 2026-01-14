import { Navigate, type RouteObject } from 'react-router-dom';

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    // TODO MainPage когда появится главная
    element: <Navigate to="/news" />,
  },
];
