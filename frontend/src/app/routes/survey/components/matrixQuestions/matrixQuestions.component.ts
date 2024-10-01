import { Component, Input, ViewEncapsulation } from "@angular/core";
import { matrixAnswers } from "../../survey";
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from "@angular/forms";
import { SurveyForm } from "../../survey.form";

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
  @Input({ required: true }) questionsForm!: SurveyForm["controls"]["aboutSurname"];

  protected readonly possibleAnswers = matrixAnswers;
}
