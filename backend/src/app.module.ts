import { Module } from '@nestjs/common';
import { WordCloudModule } from './wordCloud/wordCloud.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    WordCloudModule,
    SurveyModule,
  ],
})
export class AppModule {}
