import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      // Os dados valem por 5 minutos antes de "envelhecerem"
      retry: 1,
      // Tenta novamente 1 vez em caso de falha
      refetchOnWindowFocus: false,
      // Evita recarregar os dados toda vez que o usuário volta para a aba do navegador
    },
  },
});
