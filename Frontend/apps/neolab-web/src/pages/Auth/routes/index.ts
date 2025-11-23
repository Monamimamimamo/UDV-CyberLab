import { lazy } from 'react';

export const LoginPage = lazy(() => import('./LoginPage'));
export const RegistrationPage = lazy(() => import('./RegistrationPage'));
export const ResetPasswordPage = lazy(() => import('./ResetPasswordPage'));
export const ResetPasswordSuccessPage = lazy(() => import('./ResetPasswordSuccessPage'));
export const VerifyPage = lazy(() => import('./VerifyPage'));
export const NewPasswordPage = lazy(() => import('./NewPasswordPage'));
export const NewPasswordSuccessPage = lazy(() => import('./NewPasswordSuccessPage'));
