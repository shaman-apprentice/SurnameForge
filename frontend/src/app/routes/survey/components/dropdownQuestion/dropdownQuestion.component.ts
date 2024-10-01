import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SelectModule } from "primeng/select";

@Component({
  selector: "app-dropdown-question",
  templateUrl: "dropdownQuestion.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SelectModule,
    FormsModule,
  ]
})
export class DropdownQuestionComponent {
  @Input({ required: true }) question!: string;
  @Input({ required: true }) options!: string[];

  @Output() selected = new EventEmitter<string>();

  protected selectedValue: string | null = null;
}
