export interface ISendSMS {
  number: string;
  text?: string;
}

export interface ISendEmail {
  text?: string;
  to: string;
  subject?: string;
}

export interface INotification {
  sms: ISendSMS;
  email: ISendEmail;
}
