import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { staticFrontend } from './middlewares/staticFrontend.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(staticFrontend);
  
  await app.listen(3000);
}
bootstrap();
