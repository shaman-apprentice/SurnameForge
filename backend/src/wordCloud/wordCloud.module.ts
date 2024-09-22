import { Module } from '@nestjs/common';
import { WordCloudController } from './wordCloud.controller';

@Module({
  imports: [],
  controllers: [WordCloudController],
})
export class WordCloudModule {}
