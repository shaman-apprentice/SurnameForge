import { describe, expect, test } from "@jest/globals";
import { _parseWords, calculateWordPositions, CalculateWordPositions } from "./wordCloud.retrier";
import { firstValueFrom, of } from "rxjs";
import { WordCloudItem } from "@surename-forge/shared";

describe("wordCloud.retrier", () => {
  describe("calculateWordPositions", () => {
    test("it retries with smaller baseFontSize", async () => {
      const words: WordCloudItem[] = [];
      const calculate: CalculateWordPositions = (words, baseFontSize) =>
        of({
          couldPlaceAllWords: baseFontSize === 23 ? true : false,
          placedWords: [],
          baseFontSize
        });

        const result = await firstValueFrom(calculateWordPositions(calculate, words, 24));
        expect(result).toEqual({
          couldPlaceAllWords: true,
          placedWords: [],
          baseFontSize: 23,
        });
    });

    test("it stops retrying after minBaseFontSize reached", async () => {
      const words: WordCloudItem[] = []
      const calculate: CalculateWordPositions = (words, baseFontSize) =>
        of({
          couldPlaceAllWords: false,
          placedWords: [],
          baseFontSize
        });

        const result = await firstValueFrom(calculateWordPositions(calculate, words, 24, 6));
        expect(result).toEqual({
          couldPlaceAllWords: false,
          placedWords: [],
          baseFontSize: 6,
        });
    });
  });

  describe("_parseWords", () => {
    test("it sorts by size property", () => {
      const words: WordCloudItem[] = [
        { text: "biggest", count: 3 },
        { text: "smallest", count: 1 },
        { text: "middle", count: 2 },
      ];

      expect(_parseWords(words, 24)).toEqual([
        { text: "biggest", fontSizeInPx: 24 + 3 * 4 },
        { text: "middle", fontSizeInPx: 24 + 2 * 4 },
        { text: "smallest", fontSizeInPx: 24 + 1 * 4 },
      ])
    });

    test("words are not bigger than 300% of their siblings", () => {
      const words: WordCloudItem[] = [
        { text:"biggest", count: 100 },
        { text:"middle", count: 3 },
        { text:"smallest", count: 2 },
      ];

      expect(_parseWords(words, 1)).toEqual([
        { text: "biggest", fontSizeInPx: 39 },
        { text: "middle", fontSizeInPx: 1 + 3 * 4 },
        { text: "smallest", fontSizeInPx: 9 },
      ])
    });
  });
});
