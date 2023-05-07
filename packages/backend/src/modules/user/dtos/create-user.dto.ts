import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  loginProvider: string;

  @IsString()
  name: string;

  @IsString()
  avatar: string;
}
