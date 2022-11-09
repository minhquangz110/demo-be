import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
    setInterval(() => {
      this.pingHeroku();
    }, 500000);
  }

  pingHeroku() {
    const api = this.httpService.get(
      `https://demo-antd-t71a.vercel.app/main/products/6365e68b1db222f38edd37a5`,
    );
    return lastValueFrom(api);
  }
}
