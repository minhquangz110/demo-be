import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrderDetail,
  OrderDetailDocument,
} from './schemas/orderDetails.schema';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectModel(OrderDetail.name)
    private readonly OrderDetailModel: Model<OrderDetailDocument>,
  ) {}

  async create(orderDetail: OrderDetail) {
    const createdBillInfo = await this.OrderDetailModel.create(orderDetail);
    return createdBillInfo;
  }

  async findByIdOrder(idOrder: string): Promise<OrderDetail[]> {
    return this.OrderDetailModel.find({ idOrder: idOrder }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.OrderDetailModel.findByIdAndRemove({
      _id: id,
    }).exec();
    return deletedCat;
  }
}
