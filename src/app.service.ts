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
      `https://demo-nestjs-z.herokuapp.com/products`,
    );
    return lastValueFrom(api);
  }
}
