import { Component, Input, ViewEncapsulation } from "@angular/core";
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormArray, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-matrix-questions",
  templateUrl: "matrixQuestions.component.html",
  styleUrl: "matrixQuestions.component.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    RadioButtonModule,
    ReactiveFormsModule,
  ]
})
export class MatrixQuestionsComponent {
  @Input({ required: true }) questions!: string[];
  @Input({ required: true }) questionsForm!: FormArray<FormControl<number | null>>;
  @Input({ required: true }) possibleAnswers!: Array<{ value: number, valueLabel: string}>;
}
