import { Module } from '@nestjs/common';
import { WordCloudController } from './wordCloud.controller';
import { wordCloudDB } from './wordCloud.service';

@Module({
  imports: [],
  controllers: [ WordCloudController ],
  providers: [ wordCloudDB ]
})
export class WordCloudModule {}
