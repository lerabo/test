import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class MdBaseEntity extends Document {
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}
