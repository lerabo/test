/* eslint-disable @typescript-eslint/no-use-before-define */
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useWeb3Auth } from '../../web3auth/web3auth.provider';
import { QUERY_KEYS, STORAGE_KEYS } from '../consts/app-keys.const';
import { LOGIN_PROVIDER } from '../consts/login-providers.const';
import { authService } from '../services';
import { CreateUserDTO, UserDTO } from '../types/user.type';
import { useDecoratedQuery } from './react-query.hooks';

export const useVerify = () => {
  const { getAppPubKey, getTokenId, provider, web3Auth, login, logout, setIsLoading, setUser } =
    useWeb3Auth<UserDTO>();

  const getPubKeyAndToken = async () => {
    setIsLoading(true);
    let tokenId = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (!tokenId) {
      tokenId = (await getTokenId()).idToken;
      localStorage.setItem(STORAGE_KEYS.TOKEN, tokenId);
    }
    const pubKey = await getAppPubKey();

    return [pubKey, tokenId];
  };
  const { mutateAsync: refreshTokenAsync } = useMutation(
    [QUERY_KEYS.TOKEN, 'refresh'],
    () => getPubKeyAndToken(),
    {
      onSuccess: (data) => {
        verifyTokenAsync(data[0]);
      }
    }
  );

  const { mutateAsync: verifyTokenAsync } = useMutation(
    [QUERY_KEYS.TOKEN],
    (publicKey: string) => authService.verifyToken(publicKey),
    {
      onSuccess: (data) => {
        if (data) {
          console.log({ data });
          setUser(data);
          setIsLoading(false);
          toast.success('Token succesfully verified');
        }
      },
      onError: async (err: any) => {
        if (err.response.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          await refreshTokenAsync();
        }
        if (err.response.status === 403) {
          toast.error('Forbidden');
          logout();
        }
      }
    }
  );

  useDecoratedQuery([QUERY_KEYS.TOKEN], () => getPubKeyAndToken(), {
    enabled: provider !== null && web3Auth !== null,
    onSuccess: async (data) => {
      if (data) {
        await verifyTokenAsync(data[0]);
      }
    }
  });

  const { mutateAsync: loginAsync } = useMutation(['auth'], (payload: CreateUserDTO) =>
    authService.login(payload)
  );

  const validatePayloadAndLogin = (payload: any) => {
    loginAsync({
      email: payload.email,
      name: payload.name || '',
      avatar: payload.profileImage || '',
      loginProvider: payload.typeOfLogin
    });
  };

  const loginUser = () => {
    login(LOGIN_PROVIDER.GOOGLE, validatePayloadAndLogin);
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  };

  return {
    login: loginUser,
    logout: logoutUser
  };
};
