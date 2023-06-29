import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const withRQ = (
  component: ReactNode,
  initialData: {
    queryKey: string[];
    data: any;
  }[]
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error:
        process.env.NODE_ENV === 'test'
          ? () => {
              return;
            }
          : console.error
    }
  });

  initialData.map((el) => {
    queryClient.setQueryData(el.queryKey, el.data);
  });

  return (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};
