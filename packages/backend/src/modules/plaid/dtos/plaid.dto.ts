import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CountryCode } from 'plaid';

export class LinkTokenDTO {
  @ApiProperty()
  @IsArray()
  countryCodes: CountryCode[];
}

export class ExchnageTokenDTO {
  @ApiProperty()
  @IsString()
  publicToken: string;

  @ApiProperty()
  @IsString()
  accountId: string;
}
