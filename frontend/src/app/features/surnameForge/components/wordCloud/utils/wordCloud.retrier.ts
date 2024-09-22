import { Observable, of, switchMap } from "rxjs";
import cloud from "d3-cloud";
import { WordCloudItem } from "@surename-forge/shared";
import { WordWithFontSize } from "../wordCloud";

export type PositionedWords = {
  couldPlaceAllWords: boolean;
  placedWords: cloud.Word[];
  baseFontSize: number;
}

export type CalculateWordPositions = (words: WordWithFontSize[], baseFontSize: number)
  => Observable<PositionedWords> 

export function calculateWordPositions(
  calculate: CalculateWordPositions,
  words: WordCloudItem[],
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

export function _parseWords(words: WordCloudItem[], baseFontSize: number): WordWithFontSize[] {
  const result: WordWithFontSize[] = words
    .map(({text, count}) => ({
      text,
      // TODO some nice dynamic scale factor
      fontSizeInPx: baseFontSize + 4 * count,
    }))
    .sort((a, b) => b.fontSizeInPx - a.fontSizeInPx);

  for (let i = result.length - 1; i > 0; i--) {
    const threeTimesSize = result[i].fontSizeInPx * 3;
    if (result[i - 1].fontSizeInPx > threeTimesSize)
      result[i - 1].fontSizeInPx = threeTimesSize;
  }
  
  return result;
}
