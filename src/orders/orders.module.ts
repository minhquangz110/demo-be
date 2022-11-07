import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Order, OrderSchema } from './schemas/orders.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderDetailsModule } from 'src/orderDetails/orderDetails.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    OrderDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
