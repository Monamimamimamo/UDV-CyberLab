import { SomethingWentWrongError } from '@/shared/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { type JSX, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

export const QueryBoundary = ({
  fallbackError,
  fallbackLoader,
  children,
}: {
  fallbackError?: () => JSX.Element;
  fallbackLoader?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const location = useLocation();

  const content = (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={fallbackError ?? SomethingWentWrongError}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );

  return fallbackLoader ? (
    <Suspense key={location.pathname} fallback={fallbackLoader}>
      {content}
    </Suspense>
  ) : (
    content
  );
};
