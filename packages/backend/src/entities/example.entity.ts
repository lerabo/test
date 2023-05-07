import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { MdBaseEntity } from './base.entity';

@Schema()
export class ExampleEntity extends MdBaseEntity {
  @ApiProperty({
    type: String,
    description: 'Name of example entity'
  })
  @Prop({ required: true, unique: true, message: 'Name must be unique' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Contact number of example entity'
  })
  @Prop({ required: true })
  contactNumber: string;
}

export const ExampleSchema = SchemaFactory.createForClass(ExampleEntity);
