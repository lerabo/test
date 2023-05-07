import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../user/dtos/create-user.dto';
import { UserDTO } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async getMe(email: string, provider: string) {
    const res = await this.userService.getUnique(email, provider);
    console.log(res);
    return UserDTO.cast(res);
  }

  public async loginOrCreate(data: CreateUserDTO) {
    const isAlreadyExists = await this.userService.getUnique(data.email, data.loginProvider);
    if (isAlreadyExists) {
      return UserDTO.cast(isAlreadyExists);
    }

    const createdUser = await this.userService.create(data);

    return UserDTO.cast(createdUser);
  }
}
