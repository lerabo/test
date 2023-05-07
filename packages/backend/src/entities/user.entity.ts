import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MdBaseEntity } from './base.entity';

@Schema()
export class UserEntity extends MdBaseEntity {
  @ApiProperty({
    type: String,
    description: "User's email"
  })
  @Prop({
    required: true,
    index: {
      unique: true,
      sparse: true,
      name: 'user_key',
      errorMessage: 'email and provider combination must be unique'
    }
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Login provider'
  })
  @Prop({
    required: true,
    index: {
      unique: true,
      sparse: true,
      name: 'user_key',
      errorMessage: 'email and provider combination must be unique'
    }
  })
  loginProvider: string;

  @ApiProperty({
    type: String,
    description: "User's name"
  })
  @Prop()
  name: string;

  @ApiProperty({
    type: String,
    description: "User's avatar"
  })
  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
