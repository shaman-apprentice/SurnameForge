import { Component, Input, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: "app-free-text-question",
  templateUrl: "freeTextQuestion.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    InputTextareaModule,
    FormsModule,
  ]
})
export class FreeTextQuestionComponent {
  @Input({ required: true }) question!: string;

  protected answer = "";
}
