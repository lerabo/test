import { IsEmail, IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class AuthWalletDTO {
  @IsEthereumAddress()
  wallet: string;
}
