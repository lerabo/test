import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDTO } from '~/modules/user/dtos/create-user.dto';

export class UserRepository {
  constructor(@InjectModel(UserEntity.name) private userModel: Model<UserEntity>) {}

  public async findByEmailAndProvider(email: string, provider: string) {
    return this.userModel.findOne({ email, loginProvider: provider }).exec();
  }

  public async create(data: CreateUserDTO) {
    return this.userModel.create(data);
  }

  public async getAll(limit?: number, skip?: number) {
    return this.userModel.find().limit(skip).skip(limit).exec();
  }
}
