import { Body, Controller, Put } from '@nestjs/common';
import { SurveyDB } from './surveyDB.service';
import { SurveyResult } from '@surname-forge/shared';

@Controller("survey")
export class SurveyController {
  constructor(private surveyDB: SurveyDB) {}

  @Put()
  saveWord(@Body() data: SurveyResult): Promise<void> {
    return this.surveyDB.saveSurvey(data);
  }
}
