import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsService } from './services/payments.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [MongooseModule.forFeature([]), CommonModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, CommonModule],
  exports: [PaymentsService]
})
export class PaymentsModule {}
