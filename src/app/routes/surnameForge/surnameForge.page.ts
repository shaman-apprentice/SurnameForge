import { Component, ViewEncapsulation } from "@angular/core";
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
export class SurnameForgePage {}
