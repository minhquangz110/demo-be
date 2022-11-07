import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderDetailsService } from './orderDetails.service';

import { OrderDetail } from './schemas/orderDetails.schema';

@Controller()
export class BillInfosController {
  constructor(private readonly BillInfosService: OrderDetailsService) {}
}
