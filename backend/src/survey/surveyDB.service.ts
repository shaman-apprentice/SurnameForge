import { Injectable } from "@nestjs/common";
import { SurveyResult } from "@surname-forge/shared";
import { getDb } from "../supporting/lowdb.helper";

@Injectable()
export class SurveyDB {
  async saveSurvey(survey: SurveyResult) {
    const db = await this.getDb();
    await db.update(surveys => {
      surveys.push(survey);
    });
  }

  private async getDb() {
    const dbName = `survey/surveys.json`;
    return getDb<SurveyResult[]>(dbName, []);
  }
}
