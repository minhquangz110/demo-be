import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { AccountsModule } from './accounts/accounts.module';
import { ProductModule } from './products/products.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    AccountsModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://demo:demo@cluster0.4tbz6bw.mongodb.net/Demo?retryWrites=true&w=majority',
      {
        autoIndex: true, //make this also true
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
