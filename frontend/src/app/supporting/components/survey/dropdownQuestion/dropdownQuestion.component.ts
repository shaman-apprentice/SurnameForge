import { Component, Input, ViewEncapsulation } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-dropdown-question",
  templateUrl: "dropdownQuestion.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SelectModule,
    ReactiveFormsModule,
  ]
})
export class DropdownQuestionComponent<T> {
  @Input({ required: true }) question!: string;
  @Input({ required: true }) options!: T[];
  @Input({ required: true }) control!: FormControl<T | null>;
}
