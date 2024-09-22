import { Module } from '@nestjs/common';
import { WordCloudModule } from './wordCloud/wordCloud.module';

@Module({
  imports: [ WordCloudModule ]
})
export class AppModule {}
