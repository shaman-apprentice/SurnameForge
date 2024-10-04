import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class GlobalLoadingService {
  private _isLoading$ = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this._isLoading$;

  async withLoadingScreen(task: () => Promise<void>) {
    try {
      this._isLoading$.next(true);
      await task();
    } finally {
      this._isLoading$.next(false);
    }
  }
}
