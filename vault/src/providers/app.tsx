import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </HelmetProvider>
);

export default AppProvider;
