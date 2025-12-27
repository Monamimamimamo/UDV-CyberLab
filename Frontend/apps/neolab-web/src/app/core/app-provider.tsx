import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { ToastProvider } from '@heroui/toast';
import { Spinner } from '@/shared/ui';
import { ErrorProvider, QueryProvider } from './providers';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorProvider>
      <HeroUIProvider>
        <QueryProvider>
          <NuqsAdapter>
            <BrowserRouter>
              <Suspense
                key="root"
                fallback={
                  <div className="flex h-svh items-center justify-center">
                    <Spinner size="lg" color="primary" label="Загрузка..." />
                  </div>
                }
              >
                {children}
              </Suspense>
            </BrowserRouter>
          </NuqsAdapter>
        </QueryProvider>
        <ToastProvider placement="bottom-right" />
      </HeroUIProvider>
    </ErrorProvider>
  );
};
