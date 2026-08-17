import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';
import { queryClient } from '@/lib/react-query/queryClient';
// Note o uso do Path Alias '@' que configuramos!

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Aqui dentro rodará toda a nossa aplicação */}
      {children}
      {/* Ferramenta visual que ajuda a monitorar os dados durante o desenvolvimento */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Validação de segurança para garantir que o componente receba elementos filhos
Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
