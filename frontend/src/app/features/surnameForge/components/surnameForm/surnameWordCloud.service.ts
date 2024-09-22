import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { WordCloudItem } from "@surename-forge/shared";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SurnameWordCloudService {
  private http = inject(HttpClient);

  getWords(surname: string): Observable<WordCloudItem[]> {
    return this.http.get<WordCloudItem[]>(`/api/wordCloud?surname=${surname}`);
  }

  addWord(surname: string, word: string): Observable<WordCloudItem[]> {
    return this.http.put<WordCloudItem[]>(`/api/wordCloud?surname=${surname}`, {
      word
    });
  }
}
