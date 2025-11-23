import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from './layouts';
import {
  LoginPage,
  NewPasswordPage,
  NewPasswordSuccessPage,
  RegistrationPage,
  ResetPasswordPage,
  ResetPasswordSuccessPage,
  VerifyPage,
} from './routes';

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
      {
        path: '/reset-password',
        children: [
          {
            path: '',
            element: <ResetPasswordPage />,
          },
          {
            path: 'success',
            element: <ResetPasswordSuccessPage />,
          },
        ],
      },
      {
        path: '/verify',
        element: <VerifyPage />,
      },
      {
        path: '/new-password',
        children: [
          {
            path: '',
            element: <NewPasswordPage />,
          },
          {
            path: 'success',
            element: <NewPasswordSuccessPage />,
          },
        ],
      },
    ],
  },
];
