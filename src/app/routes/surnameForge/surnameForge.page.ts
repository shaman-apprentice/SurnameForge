import { Component, ViewEncapsulation } from "@angular/core";
import { SurnameForgeComponent } from "../../features/surnameForge/surnameForge.component";

@Component({
  selector: "app-surname-forge-page",
  templateUrl: "surnameForge.page.html",
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "h-100",
  },
  standalone: true,
  imports: [
    SurnameForgeComponent,
  ]
})
export class SurnameForgePage { }
