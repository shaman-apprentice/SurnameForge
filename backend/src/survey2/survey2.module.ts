import { Module } from '@nestjs/common';
import { Survey2Controller } from './survey2.controller';
import { Survey2DB } from './survey2DB.service';

@Module({
  imports: [],
  controllers: [ Survey2Controller ],
  providers: [ Survey2DB ]
})
export class Survey2Module {}
