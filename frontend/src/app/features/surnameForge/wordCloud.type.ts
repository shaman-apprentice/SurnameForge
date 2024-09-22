import { WordCloudWord } from "@surename-forge/shared";

/** Key is word and value is frequency of occurrence of word */
export type Words = Map<string, number>

export type WordCloudWords = WordCloudWord[]

export type Size = {
  width: number;
  height: number;
}
