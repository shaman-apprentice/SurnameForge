import { Component, inject, ViewEncapsulation } from "@angular/core";
import { MatrixQuestionsComponent } from "./components/matrixQuestions/matrixQuestions.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AboutPage } from "../about/about.page";
import { surveyTemplate } from "./survey";
import { FieldsetModule } from "primeng/fieldset";
import { DropdownQuestionComponent } from "./components/dropdownQuestion/dropdownQuestion.component";
import { FreeTextQuestionComponent } from "./components/freeTextQuestion/freeTextQuestion.component";
import { createSurveyForm, toSurveyResult } from "./survey.form";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

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
    CardModule
  ]
})
export class SurveyPage {
  protected surveyTemplate = surveyTemplate;
  protected form = createSurveyForm();

  private http = inject(HttpClient);

  protected async send() {
    console.log(toSurveyResult(this.form));
    // todo add loading indicator
    await firstValueFrom(this.http.put(`/api/survey`, toSurveyResult(this.form)));
    this.form = createSurveyForm();
  }
}
