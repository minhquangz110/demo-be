import { OrderDetailsService } from './orderDetails.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { OrderDetail, OrderDetailSchema } from './schemas/orderDetails.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BillInfosController } from './orderDetails.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  controllers: [BillInfosController],
  providers: [OrderDetailsService],
  exports: [OrderDetailsService],
})
export class OrderDetailsModule {}
