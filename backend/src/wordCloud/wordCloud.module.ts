import { Module } from '@nestjs/common';
import { WordCloudController } from './wordCloud.controller';
import { WordCloudDB } from './wordCloudDB.service';

@Module({
  imports: [],
  controllers: [ WordCloudController ],
  providers: [ WordCloudDB ]
})
export class WordCloudModule {}
