/* eslint-disable no-console */
import exampleInit from './example.mock';

const baseURL = process.env.REACT_APP_SERVER_URL || '';

export function initMocks() {
  exampleInit(baseURL);
}
if (process.env.REACT_APP_MOCK === 'enabled') {
  initMocks();
  console.log('[Mocks] Enabled');
} else {
  console.log('[Mocks] Disabled');
}
