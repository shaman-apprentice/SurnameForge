import { Component, ViewEncapsulation } from "@angular/core";
import { MatrixQuestionsComponent } from "./components/matrixQuestions/matrixQuestions.component";
import { FormsModule } from "@angular/forms";
import { AboutPage } from "../about/about.page";
import { surveyTemplate } from "./survey";
import { FieldsetModule } from "primeng/fieldset";
import { DropdownQuestionComponent } from "./components/dropdownQuestion/dropdownQuestion.component";

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
  ]
})
export class SurveyPage {
  protected surveyTemplate = surveyTemplate;
}
