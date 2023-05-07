import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '~/entities/user.entity';
import { UserRepository } from '~/repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
