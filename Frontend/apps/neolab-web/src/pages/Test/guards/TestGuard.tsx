import { useCurrentTest } from '@/entities/test-passing';
import { Navigate, Outlet } from 'react-router-dom';

export const TestGuard = () => {
  const { test } = useCurrentTest();

  if (!test) {
    return <Navigate to="/tests" />;
  }

  return <Outlet />;
};
