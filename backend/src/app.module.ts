import { Module } from '@nestjs/common';
import { WordCloudModule } from './wordCloud/wordCloud.module';
import { SurveyModule } from './survey/survey.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from "path";

@Module({
  imports: [
    WordCloudModule,
    SurveyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist/surname-forge/browser'),
      exclude: [ '/api/(.*)' ],
    }),
  ],
})
export class AppModule {}
