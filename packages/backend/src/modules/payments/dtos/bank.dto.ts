import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class BankPaymentDTO {
  @ApiProperty()
  @IsString()
  sourceCurrency: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sourceAmount: string;

  @ApiProperty()
  @IsString()
  processorToken: string;

  @ApiProperty()
  @IsString()
  destCurrency: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  autoConfirm: boolean;
}

export class BasicBankDTO {
  @ApiProperty()
  @IsString()
  paymentMethodType: string;

  @ApiProperty()
  @IsString()
  paymentType: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsString()
  beneficiaryName: string;

  @ApiProperty()
  @IsString()
  beneficiaryAddress: string;

  @ApiProperty()
  @IsString()
  beneficiaryType: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstNameOnAccount: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastNameOnAccount: string;

  @ApiProperty()
  @IsString()
  swiftBic: string;
}

export class BankPaymentResponseDTO {
  @ApiProperty()
  @IsNumber()
  exchangeRate: number;

  @ApiProperty()
  @IsNumber()
  totalFees: number;

  @ApiProperty()
  @IsNumber()
  sourceAmount: number;

  @ApiProperty()
  @IsNumber()
  destAmount: number;
}
