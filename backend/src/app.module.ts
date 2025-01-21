import { Module } from '@nestjs/common';
import { WordCloudModule } from './wordCloud/wordCloud.module';
import { SurveyModule } from './survey/survey.module';
import { Survey2Module } from './survey2/survey2.module';

@Module({
  imports: [
    WordCloudModule,
    SurveyModule,
    Survey2Module,
  ],
})
export class AppModule {}
