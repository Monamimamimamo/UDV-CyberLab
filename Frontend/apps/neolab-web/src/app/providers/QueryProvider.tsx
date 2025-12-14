import { addToast } from '@heroui/react';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    if (mutation?.meta?.skipGlobalError) {
      return;
    }
    addToast({
      title: 'Ошибка',
      description: 'Что-то пошло не так',
      color: 'danger',
      timeout: 4000,
    });
  },
});

const queryClient = new QueryClient({
  mutationCache,
  defaultOptions: {
    queries: {
      retry: false,
      refetchInterval: 60 * 1_000,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
