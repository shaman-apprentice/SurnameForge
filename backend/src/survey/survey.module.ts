import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyDB } from './surveyDB.service';

@Module({
  imports: [],
  controllers: [ SurveyController ],
  providers: [ SurveyDB ]
})
export class SurveyModule {}
