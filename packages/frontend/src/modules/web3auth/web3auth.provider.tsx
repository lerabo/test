import {
  ADAPTER_EVENTS,
  SafeEventEmitterProvider,
  UserAuthInfo,
  WALLET_ADAPTERS
} from '@web3auth/base';

import { getPublicCompressed } from '@toruslabs/eccrypto';
import { Web3AuthCore, Web3AuthCoreOptions } from '@web3auth/core';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import { TxParams } from './tx-params.type';
import { RPC } from './web3.service';

export interface Web3AuthCoreContextType<TUser = any> {
  web3Auth: Web3AuthCore | null;
  provider: SafeEventEmitterProvider | null;
  isLoading: boolean;
  address: string | undefined;
  balance: string | undefined;
  setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  login: (
    loginProvider: string,
    callback?: (userInfo: TUser) => void,
    login_hint?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  getAppPubKey: () => Promise<any>;
  signMessage: (message: string) => (rpc: RPC) => Promise<any>;
  getAddress: (rpc: RPC) => Promise<any>;
  getBalance: (rpc: RPC) => Promise<any>;
  getTokenId: () => Promise<UserAuthInfo>;
  testTransaction: (rpc: RPC) => Promise<any>;
  getPrivateKey: (rpc: RPC) => Promise<any>;
  checkProvider: (cb: Function) => void;
  checkWeb3Auth: (cb: Function) => void;
  sendTransaction: (payload: TxParams) => Promise<string>;
  sendCurrency: (payload: { amount: number; to: string }) => Promise<string>;
  isTransactionLoading: boolean;
  userInfo: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}

export const Web3AuthCoreContext = createContext<Web3AuthCoreContextType<any>>(
  {} as Web3AuthCoreContextType<any>
);

export function useWeb3Auth<T>() {
  return useContext(Web3AuthCoreContext as React.Context<Web3AuthCoreContextType<T>>);
}

type Web3AuthCoreProviderProps = {
  config: Web3AuthCoreOptions;
};

export const Web3AuthCoreProvider: FC<Web3AuthCoreProviderProps> = ({ children, config }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [userInfo, setUser] = useState<any | null>(null);

  const checkWeb3Auth = async (cb: Function) => {
    if (!web3Auth) {
      console.log('web3auth not initialized yet');
      return;
    }

    return cb(web3Auth);
  };

  const checkProvider = async (cb: Function) => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }

    const rpc = new RPC(provider);

    return cb(rpc);
  };

  const getUserInfo = async () => {
    const user = await web3Auth!.getUserInfo();
    console.log(user);
    return user;
  };

  const login = async (
    loginProvider: string,
    callback?: (userInfo: any) => void,
    login_hint?: string
  ) => {
    try {
      setIsLoading(true);
      if (!web3Auth) {
        console.log('web3auth not initialized yet');
        return;
      }
      const localProvider = await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider,
        login_hint
      });
      setProvider(localProvider!);

      const data = await getUserInfo();
      if (callback) {
        callback(data);
      }
    } catch (error) {
      console.error('Login error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await web3Auth!.logout();
    setProvider(null);
    setAddress(undefined);
    setBalance(undefined);
    setUser(null);
  };

  const getAddress = async (rpc: RPC) => {
    const account = await rpc.getAccounts();
    console.log(account);

    return account;
  };
  const getBalance = async (rpc: RPC) => {
    const userBalance = await rpc.getBalance();
    console.log(userBalance);

    return userBalance;
  };

  const checkTx = (hash: string) =>
    new Promise<any>((resolve) => {
      const web3 = new Web3(provider as any);
      const interval = setInterval(async () => {
        const receipt = await web3.eth.getTransactionReceipt(hash);
        if (receipt) {
          console.log({ receipt });
          resolve(receipt);
          clearInterval(interval);
          setIsTransactionLoading(false);
        }
      }, 1000);
    });

  const testTransaction = async (rpc: RPC) => {
    setIsTransactionLoading(true);
    const receipt = await rpc.sendTransaction();
    console.log({ receipt });
    checkProvider(getBalance).then((value) => setBalance(value));
    setIsTransactionLoading(false);
    return receipt;
  };

  const sendTransaction = async ({ gas, ...rest }: TxParams): Promise<string> => {
    const web3 = new Web3(provider as any);
    const from = (await web3.eth.getAccounts())[0];
    const txParams = {
      from,
      gas: String(gas),
      ...rest
    };
    setIsTransactionLoading(true);
    const { transactionHash } = await web3.eth.sendTransaction(txParams);
    checkTx(transactionHash).then(() =>
      checkProvider(getBalance).then((value) => setBalance(value))
    );

    return transactionHash;
  };

  const sendCurrency = async ({ amount, to }: { amount: number; to: string }): Promise<string> => {
    const web3 = new Web3(provider as any);
    const from = (await web3.eth.getAccounts())[0];

    const txParams = {
      from,
      to,
      value: Web3.utils.toWei(amount.toString())
    };
    setIsTransactionLoading(true);
    const { transactionHash } = await web3.eth.sendTransaction(txParams);
    checkTx(transactionHash);

    return transactionHash;
  };

  const signMessage = (message: string) => async (rpc: RPC) => {
    const signedMessage = await rpc.signMessage(message);
    console.log({ originalMessage: message, signedMessage });
  };

  const getPrivateKey = async (rpc: RPC) => {
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const getTokenId = async () => web3Auth!.authenticateUser();

  const getAppPubKey = async () => {
    const appScopedPrivkey = (await web3Auth?.provider?.request({
      method: 'eth_private_key' // use "private_key" for other non-evm chains
    })) as string;

    const pubKey = getPublicCompressed(
      Buffer.from(appScopedPrivkey.padStart(64, '0'), 'hex')
    ).toString('hex');

    return pubKey;
  };

  useEffect(() => {
    const subscribeAuthEvents = async (web3auth: Web3AuthCore) => {
      web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
        console.log('Connected', data);
        setProvider(web3auth.provider);
        setIsLoading(false);
      });
      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: unknown) => {
        console.error('Some error or user has cancelled login request', error);
        setIsLoading(false);
      });
    };
    async function init() {
      try {
        setIsLoading(true);
        const web3AuthInstance = new Web3AuthCore(config);
        subscribeAuthEvents(web3AuthInstance);

        const adapter = new OpenloginAdapter();
        web3AuthInstance.configureAdapter(adapter);

        await web3AuthInstance.init();
        if (web3AuthInstance.provider) {
          setProvider(web3AuthInstance.provider);
        }
        setWeb3Auth(web3AuthInstance);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (web3Auth) {
      checkProvider(getAddress).then(async (value) => {
        setAddress(value);
      });
      checkProvider(getBalance).then((value) => setBalance(value));
      setIsLoading(false);
    }
  }, [web3Auth, provider]);

  const memoedData = useMemo(
    () => ({
      web3Auth,
      provider,
      isLoading,
      login,
      logout,
      address,
      balance,
      getUserInfo,
      getTokenId,
      getAddress,
      getBalance,
      signMessage,
      checkProvider,
      checkWeb3Auth,
      getPrivateKey,
      sendTransaction,
      isTransactionLoading,
      sendCurrency,
      setBalance,
      testTransaction,
      getAppPubKey,
      setIsLoading,
      userInfo,
      setUser
    }),
    [address, web3Auth, provider, isLoading, address, balance, userInfo, isTransactionLoading]
  );
  return <Web3AuthCoreContext.Provider value={memoedData}>{children}</Web3AuthCoreContext.Provider>;
};
