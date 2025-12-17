import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from './layouts';
import {
  LoginPage,
  NewPasswordPage,
  NewPasswordSuccessPage,
  RegistrationPage,
  RegistrationSuccessPage,
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
        children: [
          {
            path: '',
            element: <RegistrationPage />,
          },
          {
            path: 'success',
            element: <RegistrationSuccessPage />,
          },
        ],
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
