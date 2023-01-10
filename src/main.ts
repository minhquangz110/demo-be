import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.use(
  //   cors({
  //     origin: '*',
  //     method: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],

  //     credentials: true,
  //   }),
  // );
  app.enableCors({
    origin: '*',
    credentials: true,

    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
