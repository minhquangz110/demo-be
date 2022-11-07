/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataApi } from 'src/types/dataApi';
import { PagiantionProp } from 'src/request/paginationProp';
import { Product, ProductDocument } from './schemas/products.schema';
import { DataList } from 'src/types/dataList';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(product: Product) {
    const createdProduct = await this.productModel.create(product);
    return createdProduct;
  }
  async getProducts(
    paginationProp: PagiantionProp,
  ): Promise<DataList<Product[]>> {
    const { page = 1, limit = 10, searchValue = '' } = paginationProp;

    const count = await this.productModel
      .find({
        name: { $regex: searchValue },
      })
      .count();

    const result = await this.productModel
      .find({
        name: { $regex: searchValue },
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return new DataList(result, count);
  }

  async findOne(id: string): Promise<DataApi<Product>> {
    const res = await this.productModel.findOne({ _id: id }).exec();

    return new DataApi(res);
  }
  async update(id: string, productUpdate: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productUpdate).exec();
  }

  async delete(id: string): Promise<DataApi<Product>> {
    const res = await this.productModel.findByIdAndRemove({ _id: id }).exec();
    return new DataApi(res);
  }
}
