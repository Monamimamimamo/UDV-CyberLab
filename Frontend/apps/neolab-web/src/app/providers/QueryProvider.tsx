import { QueryClientProvider, QueryClient, MutationCache } from '@tanstack/react-query';
import { addToast } from '@heroui/react';

const mutationCache = new MutationCache({
  onError: () => {
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
      refetchInterval: 15_000,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
