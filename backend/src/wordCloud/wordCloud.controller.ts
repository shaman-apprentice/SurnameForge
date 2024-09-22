import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { WordCloudItem } from "@surname-forge/shared";
import { wordCloudDB } from './wordCloud.service';

@Controller("wordCloud")
export class WordCloudController {
  constructor(private wordCloudDB: wordCloudDB) {}

  @Get()
  getWordCloud(@Query("surname") surname: string): Promise<WordCloudItem[]> {
    return this.wordCloudDB.getWordCloud(surname);
  }

  @Put()
  saveWord(
    @Query("surname") surname: string,
    @Body() data: { word: string; }
  ): Promise<WordCloudItem[]> {
    return this.wordCloudDB.saveWord(surname, data.word);
  }
}
