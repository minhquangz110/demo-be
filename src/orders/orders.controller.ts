import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PagiantionProp } from 'src/request/paginationProp';
import { DataApi } from 'src/types/dataApi';
import { DataList } from 'src/types/dataList';
import { OrdersData } from 'src/types/ordersData';
import { OrdersService } from './orders.service';

import { Order } from './schemas/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderData: Order) {
    console.log(orderData);
    await this.ordersService.createBill(orderData);
  }

  @Get()
  async getProducts(
    @Query() paginationProp: PagiantionProp,
  ): Promise<DataList<Order[]>> {
    return this.ordersService.getOrders(paginationProp);
  }

  @Get('user')
  async getByUsername(
    @Query('username') username: string,
    paginationProp: PagiantionProp,
  ): Promise<DataList<Order[]>> {
    return this.ordersService.findByUserName(username, paginationProp);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
