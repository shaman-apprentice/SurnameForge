import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from "@angular/core";
import { survey2Template } from "./survey2";
import { createSurvey2Form, toSurvey2Result } from "./survey2.form";
import { HttpClient } from "@angular/common/http";
import { GlobalLoadingService } from "../../services/globalLoading.service";
import { firstValueFrom } from "rxjs";
import { FreeTextQuestionComponent } from "../../supporting/components/survey/freeTextQuestion/freeTextQuestion.component";
import { DropdownQuestionComponent } from "../../supporting/components/survey/dropdownQuestion/dropdownQuestion.component";
import { MatrixQuestionsComponent } from "../../supporting/components/survey/matrixQuestions/matrixQuestions.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { FieldsetModule } from "primeng/fieldset";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-survey-two-page",
  templateUrl: "survey2.page.html",
  styleUrl: "survey2.page.css",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatrixQuestionsComponent,
    FormsModule,
    FieldsetModule,
    DropdownQuestionComponent,
    FreeTextQuestionComponent,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    RouterModule,
  ]
})
export class Survey2Page {
  protected survey2Template = survey2Template;
  protected form = createSurvey2Form();
  protected wasSent = signal(false);

  private http = inject(HttpClient);
  private globalLoadingService = inject(GlobalLoadingService);

  protected async send() {
    await this.globalLoadingService.withLoadingScreen(async () => {
      await firstValueFrom(this.http.put(`/api/survey2`, toSurvey2Result(this.form)));
      this.wasSent.set(true);
    });
  }
}
