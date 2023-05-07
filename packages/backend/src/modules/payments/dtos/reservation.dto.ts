import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentsReservationResponseDTO {
  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  reservation: string;
}
