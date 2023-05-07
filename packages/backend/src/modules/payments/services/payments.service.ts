import { HttpException, Injectable } from '@nestjs/common';
import { HttpRequestWrapper } from 'src/modules/common/wrappers/httpWrapper/httpWrapper';
import { BankPaymentDTO, BankPaymentResponseDTO } from '../dtos/bank.dto';

@Injectable()
export class PaymentsService {
  apiUrl: string;

  constructor(private readonly httpRequestWrapper: HttpRequestWrapper) {
    this.apiUrl = process.env.WYRE_API_URL;
  }

  public async getReservationLink() {
    try {
      const wyreUrl = `${this.apiUrl}/v3/orders/reserve`;

      const data = await this.httpRequestWrapper.makeRequest(
        wyreUrl,
        {
          referrerAccountId: process.env.ACCOUNT_ID
        },
        'post',
        {
          accept: 'application/json',
          contentType: 'application/json',
          authorization: `Bearer ${process.env.YOUR_WYRE_SECRET_KEY}`
        }
      );

      return data;
    } catch (e: any) {
      throw new HttpException(e.response.WYRE_API?.message || 'something went wrong', e.status);
    }
  }

  public async getTransactionsHistory() {
    try {
      const wyreUrl = `${this.apiUrl}/v3/transfers`;

      const data = await this.httpRequestWrapper.makeRequest(wyreUrl, null, 'get', {
        accept: 'application/json',
        authorization: `Bearer ${process.env.YOUR_WYRE_SECRET_KEY}`
      });

      return data;
    } catch (e: any) {
      throw new HttpException(e.response.WYRE_API?.message || 'something went wrong', e.status);
    }
  }

  async createBankTransfer({ processorToken, ...data }: BankPaymentDTO) {
    try {
      const paymentMethod = await this.createPaymentMethod(processorToken);

      const wyreUrl = `${this.apiUrl}/v3/transfers`;

      const body = {
        ...data,
        dest: paymentMethod.srn,
        source: paymentMethod.owner,
        autoConfirm: true
      };

      const res = await this.httpRequestWrapper.makeRequest(wyreUrl, body, 'post', {
        authorization: `Bearer ${process.env.YOUR_WYRE_SECRET_KEY}`
      });
      return res as BankPaymentResponseDTO;
    } catch (e: any) {
      throw new HttpException(e.response.WYRE_API?.message || 'something went wrong', e.status);
    }
  }

  async createBankPayout({ processorToken, ...data }: BankPaymentDTO) {
    try {
      const paymentMethod = await this.createPaymentMethod(processorToken);

      const wyreUrl = `${this.apiUrl}/v3/transfers`;

      const body = {
        ...data,
        dest: paymentMethod.owner,
        source: paymentMethod.srn
      };

      const res = await this.httpRequestWrapper.makeRequest(wyreUrl, body, 'post', {
        authorization: `Bearer ${process.env.YOUR_WYRE_SECRET_KEY}`
      });
      return res as BankPaymentResponseDTO;
    } catch (e: any) {
      throw new HttpException(e.response.WYRE_API?.message || 'something went wrong', e.status);
    }
  }

  async createPaymentMethod(processorToken: string) {
    const apiUrl = process.env.WYRE_API_URL;
    const wyreUrl = `${apiUrl}/v2/paymentMethods`;

    const body = {
      plaidProcessorToken: processorToken,
      paymentMethodType: 'LOCAL_TRANSFER',
      country: 'US'
    };

    const data = await this.httpRequestWrapper.makeRequest(
      wyreUrl,
      {
        ...body
      },
      'post',
      {
        authorization: `Bearer ${process.env.YOUR_WYRE_SECRET_KEY}`
      }
    );

    return data;
  }
}
