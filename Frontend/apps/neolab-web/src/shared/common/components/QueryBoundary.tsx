import { SomethingWentWrongError } from '@/shared/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { type JSX, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const QueryBoundary = ({
  fallbackError,
  fallbackLoader,
  children,
}: {
  fallbackError?: () => JSX.Element;
  fallbackLoader?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const content = (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={fallbackError ?? SomethingWentWrongError}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );

  return fallbackLoader ? <Suspense fallback={fallbackLoader}>{content}</Suspense> : content;
};
