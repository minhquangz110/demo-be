import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDetailDocument = OrderDetail & Document;

@Schema()
export class OrderDetail {
  @Prop()
  idOrder: string;

  @Prop()
  idProduct: number;

  @Prop()
  quantity: string[];

  @Prop()
  subTotal: string;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
