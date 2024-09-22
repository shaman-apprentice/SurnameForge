import { Component, ViewEncapsulation } from "@angular/core";
import { SurnameFormComponent } from "./components/surnameForm/surnameForm.component";
import { DividerModule } from "primeng/divider";

@Component({
  selector: "app-surname-forge",
  templateUrl: "surnameForge.component.html",
  styleUrl: "surnameForge.component.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SurnameFormComponent,
    DividerModule,
  ]
})
export class SurnameForgeComponent { }
