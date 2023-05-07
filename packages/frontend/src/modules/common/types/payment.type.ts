export interface ReservationLink {
  url: string;
  reservation: string;
}

export enum ECountryCode {
  Us = 'US',
  Gb = 'GB',
  Es = 'ES',
  Nl = 'NL',
  Fr = 'FR',
  Ie = 'IE',
  Ca = 'CA',
  De = 'DE',
  It = 'IT',
  Pl = 'PL',
  Dk = 'DK',
  No = 'NO',
  Se = 'SE',
  Ee = 'EE',
  Lt = 'LT',
  Lv = 'LV'
}

export interface LinkToken {
  countryCodes: ECountryCode[];
}

export interface TokenResponse {
  expiration: Date;
  link_token: string;
  request_id: string;
}

export interface ExchangeToken {
  accountId: string;
  publicToken: string;
}

export interface IProcessorTokenCreateResponse {
  processor_token: string;
  request_id: string;
}

export interface BankPayment {
  sourceCurrency: string;
  destCurrency: string;
  processorToken: string;
  sourceAmount: string;
}
