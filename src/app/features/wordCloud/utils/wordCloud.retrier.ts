import { Observable, of, switchMap } from "rxjs";
import { WordCloudWords, Words } from "../wordCloud.type";
import cloud from "d3-cloud";

export type PositionedWords = {
  couldPlaceAllWords: boolean;
  placedWords: cloud.Word[];
  baseFontSize: number;
}

export type CalculateWordPositions = (words: WordCloudWords, baseFontSize: number)
  => Observable<PositionedWords> 

export function calculateWordPositions(
  calculate: CalculateWordPositions,
  words: Words,
  baseFontSize: number,
  minBaseFontSize = 9
): Observable<PositionedWords> {
  const parsedWords = _parseWords(words, baseFontSize);
  return calculate(parsedWords, baseFontSize).pipe(
    switchMap(result => {
      if (result.couldPlaceAllWords || baseFontSize <= minBaseFontSize)
        return of(result);

      return calculateWordPositions(calculate, words, --baseFontSize, minBaseFontSize);
    })
  );
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
