import { Component, ViewEncapsulation } from "@angular/core";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-impressum",
  templateUrl: "impressum.page.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CardModule
  ]
})
export class ImpressumPage {}
