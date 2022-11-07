import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderDetail } from 'src/orderDetails/schemas/orderDetails.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  username: string;
  @Prop()
  code: string;
  @Prop()
  createAt: Date;
  @Prop()
  phone: number;

  @Prop()
  email: string[];
  @Prop()
  orderDetails: OrderDetail[];
  @Prop()
  address: string;
  @Prop()
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
