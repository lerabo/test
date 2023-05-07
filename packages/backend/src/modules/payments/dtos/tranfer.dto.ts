import { ApiProperty } from '@nestjs/swagger';

export class TransferData {
  @ApiProperty()
  closedAt: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  id: string;

  @ApiProperty()
  customId: string | null;

  @ApiProperty()
  source: string;

  @ApiProperty()
  dest: string;

  @ApiProperty()
  sourceCurrency: string;

  @ApiProperty()
  destCurrency: string;

  @ApiProperty()
  sourceAmount: number;

  @ApiProperty()
  destAmount: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  sourceName: string;

  @ApiProperty()
  destName: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string | null;

  @ApiProperty()
  exchangeRate: number;

  @ApiProperty()
  blockchainTxId: string | null;

  @ApiProperty()
  destNickname: string | null;

  @ApiProperty()
  ETHCredit: number;
}

export class PaymentsTrandfersResponseDTO {
  @ApiProperty()
  data: TransferData;

  @ApiProperty()
  position: number;

  @ApiProperty()
  recordsTotal: number;

  @ApiProperty()
  recordsFiltered: number;
}
