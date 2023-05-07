import { Button, Grid } from '@mui/material';
import { Text } from '../common/components/global-typography';
import { Loader, Spinner } from '../common/components/loader';
import { useVerify } from '../common/hooks/use-verify.hooks';
import { UserDTO } from '../common/types/user.type';
import { useWeb3Auth } from '../web3auth/web3auth.provider';

export const Web3CoreTest = () => {
  const {
    provider,
    getUserInfo,
    signMessage,
    checkProvider,
    checkWeb3Auth,
    getPrivateKey,
    testTransaction,
    isTransactionLoading,
    isLoading,
    address,
    userInfo,
    balance
  } = useWeb3Auth<UserDTO>();

  const { login, logout } = useVerify();

  const View = (
    <Grid container padding={5} direction="column" rowGap={2}>
      {!provider && (
        <Button style={{ width: '120px' }} variant="contained" onClick={login}>
          Login
        </Button>
      )}
      {provider && (
        <>
          <Text>Wallet: {address || ''}</Text>
          <Text>Balance: {`${balance || 0} ${process.env.REACT_APP_CURRENCY}`}</Text>
        </>
      )}
      {provider && userInfo && (
        <>
          <Text>Email: {userInfo.email || ''}</Text>
          <Text>Name: {userInfo.name || ''}</Text>
          <img style={{ width: '100px', height: 'auto' }} src={userInfo.avatar || ''} alt="" />
        </>
      )}
      {provider && (
        <Grid container columnGap={2}>
          <Button variant="contained" onClick={() => checkWeb3Auth(getUserInfo)}>
            Get User Info
          </Button>
          <Button
            style={{ width: '120px' }}
            variant="contained"
            onClick={() => checkProvider(getPrivateKey)}
          >
            Get Private key
          </Button>
          <Button
            style={{ width: '120px' }}
            variant="contained"
            onClick={() => checkProvider(signMessage('Hello world'))}
          >
            Sign message
          </Button>
          <Button
            style={{ width: '120px' }}
            variant="contained"
            disabled={isTransactionLoading}
            onClick={() => checkProvider(testTransaction)}
          >
            {isTransactionLoading ? <Spinner /> : 'Send transaction'}
          </Button>
          <Button style={{ width: '120px' }} variant="contained" onClick={logout}>
            Log Out
          </Button>
        </Grid>
      )}
    </Grid>
  );

  return (
    <div>
      {View}
      <Loader isLoading={isLoading} />
    </div>
  );
};
