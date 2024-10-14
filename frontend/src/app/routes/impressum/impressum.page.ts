import { Component, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-impressum",
  templateUrl: "impressum.page.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RouterModule,
  ]
})
export class ImpressumPage {}
