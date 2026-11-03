import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import PropTypes from 'prop-types';
import { queryClient } from '@/lib/react-query/queryClient';
import { useAuthSession } from '@/hooks';
// Note o uso do Path Alias '@' que configuramos!

export function Providers({ children }) {
  useAuthSession();
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
