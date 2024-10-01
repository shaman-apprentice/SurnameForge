import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { matrixAnswers, surveyTemplate } from "./survey";

export function createSurveyForm() {
  return new FormGroup({
    aboutSurname: new FormArray(
      surveyTemplate.aboutSurname.questions.map(q => 
        new FormControl<number | null>(null)
      ),
    )
  });
}

export type SurveyForm = ReturnType<typeof createSurveyForm>

export function toSurveyResult(form: SurveyForm) {
  return {
    aboutSurname: form.controls.aboutSurname.value.map((answer, i) => {
      const selectedAnswer = matrixAnswers.find(mA => mA.value === answer);
      return {
        question: surveyTemplate.aboutSurname.questions[i],
        value: selectedAnswer?.value ?? null,
        valueLabel: selectedAnswer?.valueLabel ?? null,
      }
    }),
  }
}
