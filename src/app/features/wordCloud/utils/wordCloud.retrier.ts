import { WordCloudWords, Words } from "../wordCloud.type";
import cloud from "d3-cloud";

export type PositionedWords = {
  couldPlaceAllWords: boolean;
  placedWords: cloud.Word[];
  baseFontSize: number;
}

export type CalculateWordPositions = (words: WordCloudWords, baseFontSize: number)
  => Promise<PositionedWords> 

export async function calculateWordPositionsWithRetry(
  calculate: CalculateWordPositions,
  words: Words,
  baseFontSize: number,
  minBaseFontSize = 9
): Promise<PositionedWords> {
  const parsedWords = _parseWords(words, baseFontSize);
  const result = await calculate(parsedWords, baseFontSize);
  if (result.couldPlaceAllWords || baseFontSize <= minBaseFontSize)
    return result;

  return calculateWordPositionsWithRetry(calculate, words, --baseFontSize, minBaseFontSize);
} 

export function _parseWords(words: Words, baseFontSize: number): WordCloudWords {
  const result: WordCloudWords = [...words.entries()]
    .map(([word, frequency]) => ({
      text: word,
      size: baseFontSize + frequency,
    }))
    .sort((a, b) => b.size - a.size);

  for (let i = result.length - 1; i > 0; i--) {
    const oneAndAHalf = result[i].size * 1.5;
    if (result[i - 1].size > oneAndAHalf)
      result[i - 1].size = oneAndAHalf;
  }
  
  return result;
}
