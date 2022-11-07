import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDetailsService } from 'src/orderDetails/orderDetails.service';
import { OrderDetailDocument } from 'src/orderDetails/schemas/orderDetails.schema';
import { PagiantionProp } from 'src/request/paginationProp';
import { DataApi } from 'src/types/dataApi';
import { DataList } from 'src/types/dataList';
import { OrdersData } from 'src/types/ordersData';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly orderDetaisService: OrderDetailsService,
  ) {}

  async createBill(order: OrdersData): Promise<DataApi<Order>> {
    try {
      // const orderDetails = order.orderDetails;
      // delete order.orderDetails;
      order.createAt = new Date(Date.now());
      // order.orderDetails.forEach
      const createOrder = await this.orderModel.create(order);
      // if (createOrder) {
      //   for (let i = 0; i < orderDetails.length; ++i) {
      //     orderDetails[i].idOrder = createOrder._id;
      //     await this.orderDetaisService.create(orderDetails[i]);
      //   }
      // }
      return new DataApi(createOrder);
    } catch (e) {
      return new DataApi(null, false, e);
    }
  }
  async getOrders(paginationProp: PagiantionProp): Promise<DataList<Order[]>> {
    const { page = 1, limit = 10, searchValue = '' } = paginationProp;

    const count = await this.orderModel
      .find({
        name: { $regex: searchValue },
      })
      .count();

    const result = await this.orderModel
      .find({
        name: { $regex: searchValue },
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return new DataList(result, count);
  }

  async findByUserName(
    username: string,
    paginationProp: PagiantionProp,
  ): Promise<DataList<Order[]>> {
    const { page = 1, limit = 10, searchValue = '' } = paginationProp;

    const count = await this.orderModel
      .find({
        username: username,
      })
      .count();

    const result = await this.orderModel
      .find({
        name: { $regex: searchValue },
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return new DataList(result, count);
  }

  async delete(id: string) {
    const deletedCat = await this.orderModel
      .findByIdAndRemove({
        _id: id,
      })
      .exec();
    return deletedCat;
  }
}
