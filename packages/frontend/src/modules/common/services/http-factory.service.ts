import axios from 'axios';
import { EnhancedWithAuthHttpService } from './http-auth.service';
import { HttpService } from './http.service';
import { MockDB, MockHttpClient } from './mock-http.service';

export class HttpFactoryService {
  static createHttpService(): HttpService {
    return process.env.REACT_APP_MOCK === 'enabled'
      ? new HttpService(new MockHttpClient(MockDB.connection()))
      : new HttpService(axios);
  }

  static createAuthHttpService() {
    return new EnhancedWithAuthHttpService(this.createHttpService());
  }
}
