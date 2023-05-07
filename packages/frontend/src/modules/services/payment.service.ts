import { HttpFactoryService } from '../common/services/http-factory.service';
import { EnhancedWithAuthHttpService } from '../common/services/http-auth.service';
import { ExpectedFromQuery } from '../common/types/services.type';
import {
  BankPayment,
  ExchangeToken,
  IProcessorTokenCreateResponse,
  LinkToken,
  ReservationLink,
  TokenResponse
} from '../common/types/payment.type';

class PaymentService {
  constructor(private httpService: EnhancedWithAuthHttpService) {}

  async getReservationLink(): Promise<ExpectedFromQuery<ReservationLink>> {
    return this.httpService.get<ReservationLink>('payments/reservation');
  }

  async getTransactionsHistory(): Promise<ExpectedFromQuery<any>> {
    return this.httpService.get<any>('payments/history');
  }

  async createLinkToken(data: LinkToken): Promise<ExpectedFromQuery<TokenResponse>> {
    return this.httpService.post<TokenResponse, LinkToken>('plaid/create-link-token', data);
  }

  async exchangeToken(
    data: ExchangeToken
  ): Promise<ExpectedFromQuery<IProcessorTokenCreateResponse>> {
    return this.httpService.post<IProcessorTokenCreateResponse, ExchangeToken>(
      'plaid/exchange-public-token',
      data
    );
  }

  async bankPayment(data: BankPayment): Promise<ExpectedFromQuery<any>> {
    return this.httpService.post<any, BankPayment>('payments/bank-transfer', data);
  }

  async bankPayout(data: BankPayment): Promise<ExpectedFromQuery<any>> {
    return this.httpService.post<any, BankPayment>('payments/bank-payout', data);
  }
}
const httpService = HttpFactoryService.createAuthHttpService();
export const paymentService = new PaymentService(httpService);
