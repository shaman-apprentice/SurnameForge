import { Component, ViewEncapsulation } from "@angular/core";
import { MatrixQuestionsComponent } from "./components/matrixQuestions/matrixQuestions.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AboutPage } from "../about/about.page";
import { surveyTemplate } from "./survey";
import { FieldsetModule } from "primeng/fieldset";
import { DropdownQuestionComponent } from "./components/dropdownQuestion/dropdownQuestion.component";
import { FreeTextQuestionComponent } from "./components/freeTextQuestion/freeTextQuestion.component";
import { createSurveyForm, toSurveyResult } from "./survey.form";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-survey-page",
  templateUrl: "survey.page.html",
  styleUrl: "survey.page.css",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatrixQuestionsComponent,
    FormsModule,
    AboutPage,
    FieldsetModule,
    DropdownQuestionComponent,
    FreeTextQuestionComponent,
    ReactiveFormsModule,
    ButtonModule,
  ]
})
export class SurveyPage {
  protected surveyTemplate = surveyTemplate;
  protected form = createSurveyForm();

  protected async send() {
    console.log(toSurveyResult(this.form));
  }
}
