import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
    setInterval(() => {
      this.pingHeroku();
    }, 200000);
  }

  getHello() {
    return 'Hello';
  }
  pingHeroku() {
    const api = this.httpService.get(
      `https://demo-nestjs-z.herokuapp.com/api/api`,
    );
    return lastValueFrom(api);
  }
}
