import { describe, expect, test } from "@jest/globals";
import { Words } from "../wordCloud.type";
import { _parseWords, calculateWordPositions, CalculateWordPositions } from "./wordCloud.retrier";
import { firstValueFrom, of } from "rxjs";

describe("wordCloud.retrier", () => {
  describe("calculateWordPositions", () => {
    test("it retries with smaller baseFontSize", async () => {
      const words: Words = new Map([]);
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
      const words: Words = new Map([]);
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
      const words: Words = new Map([
        ["biggest", 3],
        ["smallest", 1],
        ["middle", 2],
      ]);

      expect(_parseWords(words, 24)).toEqual([
        { text: "biggest", size: 27 },
        { text: "middle", size: 26 },
        { text: "smallest", size: 25 },
      ])
    });

    test("words are not bigger than 150% of their siblings", () => {
      const words: Words = new Map([
        ["biggest", 10],
        ["middle", 3],
        ["smallest", 2],
      ]);

      expect(_parseWords(words, 1)).toEqual([
        { text: "biggest", size: 6 },
        { text: "middle", size: 4 },
        { text: "smallest", size: 3 },
      ])
    });
  });
});
