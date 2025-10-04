import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from './layouts';
import { LoginPage, RegistrationPage } from './routes';

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
    ],
  },
];
