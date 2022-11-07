import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { DataApi } from 'src/types/dataApi';
import * as bcrypt from 'bcrypt';
import { Account } from 'src/accounts/schemas/accounts.schema';
@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountsService.findByUserName(username);

    const hashPassword = await this.hashPassword(pass);

    if (user && (await this.doesPasswordMatch(pass, hashPassword))) {
      user.password = undefined;
      return user;
    }
    return null;
  }
  async login(user: any) {
    if (user.name) {
      const payload = { payload: user, sub: user.userId };

      return new DataApi(this.jwtService.sign(payload));
    } else {
      return user;
    }
  }
  async register(account: Account, author = 'user') {
    const existingUserName = await this.accountsService.findByUserName(
      account.username,
    );
    if (existingUserName) {
      return new DataApi(null, false, 'Tài khoản đã tồn tại');
    }
    const hashedPassword = await this.hashPassword(account.password);
    account.password = hashedPassword;
    await this.accountsService.createAccount(account, author);
    return new DataApi(
      await this.accountsService.findByUserName(account.username),
    );
  }
  async registerByAdmin(account: Account, author = 'user') {
    this.register(account, author);
  }
}
