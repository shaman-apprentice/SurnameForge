import { Injectable } from "@nestjs/common";
import { WordCloudItem } from "@surname-forge/shared";
import { getDb } from "../supporting/lowdb.helper";

@Injectable()
export class WordCloudDB {
  async getWordCloud(surname: string): Promise<WordCloudItem[]> {
    const db = await this.getDb(surname);
    return db.data;
  } 

  async saveWord(surname: string, word: string): Promise<WordCloudItem[]> {
    const db = await this.getDb(surname);
    await db.update(wordCloud => {
      const existingItem = wordCloud.find(item => item.text === word);
      if (existingItem === undefined) {
        wordCloud.push({
          text: word,
          count: 1,
        });
      } else {
        existingItem.count += 1;
      }
    });
    return db.data;
  }

  private async getDb(surname: string) {
    const dbName = `wordCloud/__db-${surname}__.json`;
    return getDb<WordCloudItem[]>(dbName, [])
  }
}
