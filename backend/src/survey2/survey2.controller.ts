import { Body, Controller, Put } from '@nestjs/common';
import { Survey2DB } from './survey2DB.service';
import { Survey2Result } from '@surname-forge/shared';

@Controller("api/survey2")
export class Survey2Controller {
  constructor(private survey2DB: Survey2DB) {}

  @Put()
  saveWord(@Body() data: Survey2Result): Promise<void> {
    console.log(data)
    return this.survey2DB.saveSurvey2(data);
  }
}
