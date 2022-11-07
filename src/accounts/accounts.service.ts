/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataApi } from 'src/types/dataApi';
import { PagiantionProp } from 'src/request/paginationProp';
import { DataList } from 'src/types/dataList';
import { Account, AccountDocument } from './schemas/accounts.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(account: Account, author = 'user') {
    const createdAccount = await this.accountModel.create({
      ...account,
      author: author,
    });
    return createdAccount;
  }
  async getAccounts(
    paginationProp: PagiantionProp,
  ): Promise<DataList<Account[]>> {
    const { page = 1, limit = 10, searchValue = '' } = paginationProp;

    const count = await this.accountModel
      .find({
        name: { $regex: searchValue },
      })
      .count();

    const result = await this.accountModel
      .find({
        name: { $regex: searchValue },
      })
      .skip((page - 1) * limit)
      .limit(limit);

    return new DataList(result, count);
  }

  async findByUserName(username: string) {
    const res = await this.accountModel.findOne({ username: username }).exec();
    return res;
  }
  async update(
    id: string,
    accountUpdate: Partial<Account>,
  ): Promise<DataApi<Account>> {
    if (accountUpdate.username) {
      delete accountUpdate.username;
    }

    const res = await this.accountModel
      .findByIdAndUpdate(id, accountUpdate)
      .exec();

    return new DataApi(res);
  }

  async delete(id: string): Promise<DataApi<Account>> {
    const res = await this.accountModel.findByIdAndRemove({ _id: id }).exec();
    return new DataApi(res);
  }
}
