import { Injectable } from '@nestjs/common';
import { UserRepository } from '~/repositories/user.repository';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUnique(email: string, provider: string) {
    return this.userRepository.findByEmailAndProvider(email, provider);
  }

  async create(data: CreateUserDTO) {
    return this.userRepository.create(data);
  }
}
