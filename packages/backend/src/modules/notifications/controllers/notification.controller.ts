import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGetResponse } from 'src/modules/common/decorators';
import { NotificationService } from '../services/notification.service';
import { INotification } from '~/modules/common/types/notifications';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('')
  @ApiOperation({ summary: 'send notification' })
  @ApiGetResponse('Successfully sent notification', String as any)
  async sendNotification(@Body() data: INotification) {
    return this.notificationService.sendNotification(data);
  }
}
