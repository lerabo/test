import { CHAIN_NAMESPACES } from '@web3auth/base';
import toast, { Toaster } from 'react-hot-toast';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { MainRouter } from '../navigation';

import '../../__mocks__';
import '../../style.css';
import * as theme from '../theme';
import { Web3AuthCoreProvider } from '../web3auth/web3auth.provider';
import * as Styled from './app.styled';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`);
      }
    }
  })
});

const web3AuthClientOpts = {
  clientId: String(process.env.REACT_APP_WEB3AUTH_CLIENT_ID),
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: process.env.REACT_APP_CHAIN_ID,
    rpcTarget: process.env.REACT_APP_RPC_TARGER,
    ticker: process.env.REACT_APP_CURRENCY,
    tickerName: process.env.REACT_APP_CURRENCY
  }
};

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <Styled.GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <Web3AuthCoreProvider config={web3AuthClientOpts}>
        <MainRouter />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" reverseOrder />
      </Web3AuthCoreProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default AppContainer;
