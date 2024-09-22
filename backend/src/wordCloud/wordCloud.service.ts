import { Injectable } from "@nestjs/common";
import { WordCloudItem } from "@surname-forge/shared";

@Injectable()
export class wordCloudDB {
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
    const dbName = `lowdb/__db-${surname}__.json`;
    // NestJS doesn't support ESM -.- - so use dynamic imports in combination with TS `moduleResolution: Node16`
    const { JSONFilePreset } = await import("lowdb/node");
    return await JSONFilePreset<WordCloudItem[]>(dbName, []);
  }
}
