import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Box, Button } from '@mui/material';
import { usePayment } from '../common/hooks/payment.hook';
import { Loader } from '../common/components/loader';

export const Payment = () => {
  const {
    refetch,
    link,
    createTransfer,
    linkToken,
    tokenLoading,
    exchangeToken,
    createLink,
    processorLoading,
    processorToken,
    bankPayout,
    tranferLoading,
    payoutLoading,
    getHistory,
    historyLoading
  } = usePayment();

  const redirect = () => {
    if (link) {
      window.open(link.url);
    }
  };

  const bantPayment = () => {
    if (processorToken) {
      createTransfer({
        sourceCurrency: 'USD',
        sourceAmount: '50',
        processorToken: processorToken.processor_token,
        destCurrency: 'USD'
      });
    }
  };

  const makePayout = () => {
    if (processorToken) {
      bankPayout({
        sourceCurrency: 'USD',
        sourceAmount: '50',
        processorToken: processorToken.processor_token,
        destCurrency: 'USD'
      });
    }
  };

  React.useEffect(() => {
    createLink();
    refetch();
  }, []);

  const onSuccess = useCallback(async (public_token: string, metadata: any) => {
    exchangeToken({ publicToken: public_token, accountId: metadata.account_id });
  }, []);

  const config = {
    token: linkToken?.link_token ?? '',
    onSuccess
  };

  const { open, ready } = usePlaidLink(config);

  if (tokenLoading || processorLoading || tranferLoading || payoutLoading) {
    return <Loader isLoading />;
  }

  return (
    <Box>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={() => open()}
        disabled={!ready}
      >
        Link account
      </Button>
      <Button style={{ margin: '10px' }} variant="contained" onClick={redirect} disabled={!link}>
        Send transaction by card
      </Button>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={bantPayment}
        disabled={!processorToken}
      >
        Send transaction by bank
      </Button>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={makePayout}
        disabled={!processorToken}
      >
        Payout
      </Button>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={() => getHistory()}
        disabled={historyLoading}
      >
        Get history
      </Button>
    </Box>
  );
};
