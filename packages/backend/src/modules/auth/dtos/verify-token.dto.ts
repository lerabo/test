/* eslint-disable max-classes-per-file */
import { IsString } from 'class-validator';

export class VerifyTokenResponse {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  provider: string;

  static cast(data: any) {
    const response = new VerifyTokenResponse();
    response.email = data.email;
    response.name = data.name;
    response.provider = 'google'; // TODO: complete logic of parsing aggregateVerifier from tokenId

    return response;
  }
}
