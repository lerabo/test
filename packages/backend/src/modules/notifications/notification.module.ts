import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './controllers/notification.controller';
import { NotificationService } from './services/notification.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [MongooseModule.forFeature([]), CommonModule],
  controllers: [NotificationController],
  providers: [NotificationService, CommonModule],
  exports: [NotificationService]
})
export class NotificationModule {}
