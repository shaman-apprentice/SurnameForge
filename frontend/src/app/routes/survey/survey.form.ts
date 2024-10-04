import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { matrixAnswers, surveyTemplate } from "./survey";
import { SurveyResult } from "@surename-forge/shared";

export function createSurveyForm() {
  return new FormGroup({
    aboutSurname: new FormArray(
      surveyTemplate.aboutSurname.questions.map(q => new FormControl<number | null>(null))
    ),
    aboutProblem: new FormControl<string | null>(null),
    aboutAI: new FormGroup({
      howOften: new FormControl<string | null>(null),
      matrix: new FormArray(
        surveyTemplate.aboutAI.matrix.questions.map(q => new FormControl<number | null>(null))
      ),
    }),
    openEnded: new FormGroup({
      decisionForSurname: new FormControl<string>("", { nonNullable: true }),
      other: new FormControl<string>("", { nonNullable: true }),
    }),
    demographic: new FormGroup({
      age: new FormControl<string | null>(null),
      gender: new FormControl<string | null>(null),
      relationStatus: new FormControl<string | null>(null),
    })
  });
}

export type SurveyForm = ReturnType<typeof createSurveyForm>

export function toSurveyResult(form: SurveyForm): SurveyResult {
  const value = form.getRawValue();
  return {
    aboutSurname: value.aboutSurname.map((answer, i) => {
      const selectedAnswer = matrixAnswers.find(mA => mA.value === answer);
      return {
        question: surveyTemplate.aboutSurname.questions[i],
        value: selectedAnswer?.value ?? null,
        valueLabel: selectedAnswer?.valueLabel ?? null,
      }
    }),
    aboutProblem: value.aboutProblem === null ? null : value.aboutProblem === "Yes",
    aboutAI: {
      howOften: value.aboutAI.howOften,
      matrix: value.aboutAI.matrix.map((answer, i) => {
        const selectedAnswer = matrixAnswers.find(mA => mA.value === answer);
        return {
          question: surveyTemplate.aboutAI.matrix.questions[i],
          value: selectedAnswer?.value ?? null,
          valueLabel: selectedAnswer?.valueLabel ?? null,
        }
      }),
    },
    openEnded: {
      decisionForSurname: value.openEnded.decisionForSurname,
      other: value.openEnded.other
    },
    demographic: {
      age: value.demographic.age,
      gender: value.demographic.gender,
      relationStatus: value.demographic.relationStatus,
    }
  }
}
