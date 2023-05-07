import { HttpException, Injectable } from '@nestjs/common';
import { INotification } from '~/modules/common/types/notifications';
import { NotificationWrapper } from '~/modules/common/wrappers/notificationWrapper/notification.wrapper';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationWrapper: NotificationWrapper) {}

  public async sendNotification({ sms, email }: INotification) {
    try {
      const data = await this.notificationWrapper.sendSMS({
        ...sms
      });

      const res = await this.notificationWrapper.sendEmail({
        ...email
      });

      return { data, res };
    } catch (e: any) {
      throw new HttpException('something went wrong', e.status);
    }
  }
}
