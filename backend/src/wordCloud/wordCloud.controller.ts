import { Controller, Get } from '@nestjs/common';
import { WordCloudWord } from "@surname-forge/shared";

@Controller("wordCloud")
export class WordCloudController {
  constructor() {}

  @Get()
  getHello(): WordCloudWord {
    return {
      size: 1,
      text: "yeah"
    };
  }
}
