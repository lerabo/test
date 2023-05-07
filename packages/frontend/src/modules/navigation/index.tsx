import { Container } from '@mui/material';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import HomePageContainer from '../home';
import { Web3CoreTest } from '../web3-test';
import { Payment } from '../payment';

export const MainRouter = () => (
  <Container disableGutters maxWidth={false}>
    <Router>
      <Switch>
        <Route component={Web3CoreTest} path={APP_KEYS.ROUTER_KEYS.TEST} />
        <Route component={Payment} path={APP_KEYS.ROUTER_KEYS.PAYMENT} />
        <Route component={HomePageContainer} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      </Switch>
    </Router>
  </Container>
);
