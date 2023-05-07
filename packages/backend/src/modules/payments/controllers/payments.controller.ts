import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiGetResponse } from 'src/modules/common/decorators';
import { PaymentsService } from '../services/payments.service';
import { PaymentsReservationResponseDTO } from '../dtos/reservation.dto';
import { PaymentsTrandfersResponseDTO } from '../dtos/tranfer.dto';
import { BankPaymentDTO } from '../dtos/bank.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(public readonly paymentsService: PaymentsService) {}

  @Get('/reservation')
  @ApiOperation({ summary: 'get reservation link' })
  @ApiGetResponse('Successfully got link', PaymentsReservationResponseDTO as any)
  getReservationLink() {
    return this.paymentsService.getReservationLink();
  }

  @Get('/history')
  @ApiOperation({ summary: 'get transactions history' })
  @ApiGetResponse('Successfully got history', PaymentsTrandfersResponseDTO as any)
  getTransactionsHistory() {
    return this.paymentsService.getTransactionsHistory();
  }

  @Post('/bank-transfer')
  @ApiOperation({ summary: 'create transfer via bank' })
  @ApiGetResponse('Successfully created transfer', String as any)
  async createBankTransfer(@Body() data: BankPaymentDTO) {
    return this.paymentsService.createBankTransfer(data);
  }

  @Post('/bank-payout')
  @ApiOperation({ summary: 'create bank payout' })
  @ApiGetResponse('Successfully created payout', String as any)
  async createBankPayout(@Body() data: BankPaymentDTO) {
    return this.paymentsService.createBankPayout(data);
  }
}
