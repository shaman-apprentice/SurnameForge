import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { matrixAnswers } from "../../survey";
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatrixAnswer } from "@surename-forge/shared";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-matrix-questions",
  templateUrl: "matrixQuestions.component.html",
  styleUrl: "matrixQuestions.component.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    RadioButtonModule,
    FormsModule,
  ]
})
export class MatrixQuestionsComponent implements OnInit {
  @Input({ required: true }) questions!: string[];

  @Output() onAnswer = new EventEmitter<MatrixAnswer[]>();

  protected readonly possibleAnswers = matrixAnswers;
  protected radioButtonValues: Record<string, number | null> = {}

  ngOnInit(): void {
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      this.radioButtonValues[question] = null;
    }
  }

  emitChange() {
    const answers: MatrixAnswer[] = Object.entries(this.radioButtonValues).map(([question, value]) => ({
      question,
      value,
      valueLabel: value !== null ? this.possibleAnswers[value].valueLabel : null,
    }));
    this.onAnswer.emit(answers);
  }
}
