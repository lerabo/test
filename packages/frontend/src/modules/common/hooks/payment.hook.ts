import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { paymentService } from '../../services/payment.service';
import { BankPayment, ECountryCode, ExchangeToken, ReservationLink } from '../types/payment.type';
import { QUERY_KEYS } from '../consts/app-keys.const';

export const usePayment = () => {
  const [link, setLink] = React.useState<null | ReservationLink>(null);
  const [history, setHistory] = React.useState<any>(null);

  const { isLoading, refetch } = useQuery(
    [QUERY_KEYS.RESERVATION],
    () => paymentService.getReservationLink(),
    {
      enabled: false,
      onError: async (err: any) => {
        toast.error(err.response.data.message);
      },
      onSuccess: (data: ReservationLink) => {
        setLink(data);
      }
    }
  );

  const { isLoading: historyLoading, refetch: getHistory } = useQuery(
    [QUERY_KEYS.PAYMENT],
    () => paymentService.getTransactionsHistory(),
    {
      enabled: false,
      onError: async (err: any) => {
        toast.error(err.response.data.message);
      },
      onSuccess: (data: any) => {
        setHistory(data);
      }
    }
  );

  const {
    mutate: createTransfer,
    data: transferResult,
    isLoading: tranferLoading
  } = useMutation([QUERY_KEYS.PAYMENT], (data: BankPayment) => paymentService.bankPayment(data), {
    onError: async (err: any) => {
      toast.error(err.response.data.message);
    }
  });

  const {
    mutate: bankPayout,
    data: payoutResult,
    isLoading: payoutLoading
  } = useMutation([QUERY_KEYS.PAYMENT], (data: BankPayment) => paymentService.bankPayout(data), {
    onError: async (err: any) => {
      toast.error(err.response.data.message);
    }
  });

  const {
    mutate: createLink,
    data: linkToken,
    isLoading: tokenLoading
  } = useMutation([QUERY_KEYS.PLAID], () =>
    paymentService.createLinkToken({ countryCodes: [ECountryCode.Us] })
  );

  const {
    mutate: exchangeToken,
    data: processorToken,
    isLoading: processorLoading
  } = useMutation([QUERY_KEYS.PLAID], (data: ExchangeToken) => paymentService.exchangeToken(data));

  if (processorToken) {
    localStorage.setItem('processorToken', processorToken.processor_token);
  }

  return {
    refetch,
    link,
    isLoading,
    createTransfer,
    transferResult,
    linkToken,
    tokenLoading,
    exchangeToken,
    processorToken,
    createLink,
    processorLoading,
    bankPayout,
    payoutResult,
    tranferLoading,
    payoutLoading,
    getHistory,
    history,
    historyLoading
  };
};
