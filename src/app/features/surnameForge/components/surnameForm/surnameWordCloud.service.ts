import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Words } from "../../wordCloud.type";

const wc1: Words = new Map([
  ["Hello", 1],
  ["world", 1],
  ["normally", 1],
  ["you", 1],
  ["want", 1],
  ["more", 1],
  ["words", 1],
  ["than", 2],
  ["this", 1],
]);
const wc2: Words = new Map([
  ["still", 2],
  ["komisch", 3],
  ["hilfsbereit", 10],
  ["schlau", 1],
  ["Hase", 1],
  ["Nächstenliebe", 5],
  ["Ein sndTestPerson kommt selten allein", 3],
]);

@Injectable({ providedIn: "root" })
export class SurnameWordCloudService {
  private http = inject(HttpClient);

  getWords(surname: string): Observable<Words> {
    return of(surname === "fstTestPerson" ? wc1 : wc2);
  }

  addWord(surname: string, word: string): Observable<Words> {
    const target = surname === "fstTestPerson" ? wc1 : wc2;
    const currentCount = target.get(word) ?? 0;
    console.log(currentCount)
    target.set(word, currentCount + 1);
    return of(new Map(target));
  }
}
