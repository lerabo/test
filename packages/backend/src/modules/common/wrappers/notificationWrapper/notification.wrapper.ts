import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { ISendSMS, ISendEmail } from '../../types/notifications';

const sgMail = require('@sendgrid/mail');

@Injectable()
export class NotificationWrapper {
  client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  sgMail = sgMail;

  public async sendSMS({ number, text }: ISendSMS) {
    this.client.messages
      .create({
        body: text,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: number
      })
      .then((message) => console.log('SMS sent successfully', message.sid))
      .catch((err) => console.log(err));
  }

  public async sendEmail({ text, to, subject }: ISendEmail) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to,
      from: process.env.SENDGRID_API_EMAIL,
      subject: subject ?? 'Hey, this is a test message',
      text,
      html: `<strong>${text}</strong>`
    };

    try {
      await sgMail.send(msg);
      console.log('Mail sent successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
