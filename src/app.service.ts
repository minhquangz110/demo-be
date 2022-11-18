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
    const api = this.httpService.get(`https://demo-be.onrender.com/api`);
    return lastValueFrom(api);
  }
}
