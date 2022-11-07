import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({ required: true })
  author: string;
  @Prop()
  phone: number;

  @Prop()
  email: string;

  @Prop()
  address: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
