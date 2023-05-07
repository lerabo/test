import { Module } from '@nestjs/common';
import { PlaidController } from './controllers/plaid.controller';
import { PlaidService } from './services/plaid.service';

@Module({
  controllers: [PlaidController],
  providers: [PlaidService]
})
export class PlaidModule {}
