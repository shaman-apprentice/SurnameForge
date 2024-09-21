import { Component, signal, ViewEncapsulation } from "@angular/core";
import { WordCloudComponent } from "../../features/wordCloud/wordCloud.component";

@Component({
  selector: "app-surname-forge",
  templateUrl: "surnameForge.page.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    WordCloudComponent,
  ]
})
export class SurnameForgePage {
  protected wc = signal(new Map([
    ["Hello", 1],
    ["world", 1],
    ["normally", 1],
    ["you", 1],
    ["want", 1],
    ["more", 1],
    ["words", 1],
    ["than", 2],
    ["this", 1],
  ]));

  constructor() {
    setTimeout(() => {
      this.wc.set(new Map([
        ["Hello", 1],
      ]));
    }, 1000)
  }
}
