import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordCloudModule } from './wordCloud/wordCloud.module';

@Module({
  imports: [WordCloudModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
