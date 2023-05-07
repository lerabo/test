import { Injectable, HttpException } from '@nestjs/common';
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  ProcessorTokenCreateRequestProcessorEnum,
  ProcessorTokenCreateResponse,
  Products
} from 'plaid';

import { HttpRequestWrapper } from 'src/modules/common/wrappers/httpWrapper/httpWrapper';
import { ExchnageTokenDTO, LinkTokenDTO } from '../dtos/plaid.dto';

@Injectable()
export class PlaidService {
  plaidClient: PlaidApi;

  constructor(private readonly httpRequestWrapper: HttpRequestWrapper) {
    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET
        }
      }
    });

    this.plaidClient = new PlaidApi(configuration);
  }

  async newToken(data: LinkTokenDTO) {
    try {
      const tokenResponse = await this.plaidClient.linkTokenCreate({
        user: {
          client_user_id: Date.now().toString()
        },
        client_name: 'Watt2Trade',
        products: [Products.Auth, Products.Identity],
        country_codes: data.countryCodes,
        language: 'en',
        webhook: 'https://sample-web-hook.com'
      });

      return tokenResponse.data;
    } catch (err: any) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  async exchangeToken(data: ExchnageTokenDTO): Promise<ProcessorTokenCreateResponse> {
    try {
      const exchangeTokenResponse = await this.plaidClient.itemPublicTokenExchange({
        public_token: data.publicToken,
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET
      });

      // Create a processor token for a specific account id.
      const processorTokenResponse = await this.plaidClient.processorTokenCreate({
        access_token: exchangeTokenResponse.data.access_token,
        account_id: data.accountId,
        processor: ProcessorTokenCreateRequestProcessorEnum.Wyre,
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET
      });

      return processorTokenResponse.data;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
