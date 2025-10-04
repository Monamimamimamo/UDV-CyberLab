import { DefaultError } from '@/shared/ui';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary fallbackRender={DefaultError}>
      {children}
    </ReactErrorBoundary>
  );
};
