import { Injectable } from "@nestjs/common";
import { Survey2Result } from "@surname-forge/shared";
import { getDb } from "../supporting/lowdb.helper";

@Injectable()
export class Survey2DB {
  async saveSurvey2(survey: Survey2Result) {
    const db = await this.getDb();
    await db.update(surveys => {
      surveys.push(survey);
    });
  }

  private async getDb() {
    const dbName = `survey/surveys2.json`;
    return getDb<Survey2Result[]>(dbName, []);
  }
}
