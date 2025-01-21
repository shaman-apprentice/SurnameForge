import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Survey2Result } from "@surename-forge/shared";
import { matrixAnswers, survey2Template } from "./survey2";

export function createSurvey2Form() {
  return new FormGroup({
    targetQuestions: new FormArray(
      survey2Template.targetQuestions.questions.map(q => new FormControl<number | null>(null))
    ),
    other: new FormControl<string | null>(null),
    demographic: new FormGroup({
      age: new FormControl<string | null>(null),
      gender: new FormControl<string | null>(null),
      country: new FormControl<string | null>(null),
      relationStatus: new FormControl<string | null>(null),
    })
  });
}

export type Survey2Form = ReturnType<typeof createSurvey2Form>

export function toSurvey2Result(form: Survey2Form): Survey2Result {
  const value = form.getRawValue();
  return {
    targetQuestions: value.targetQuestions.map((answer, i) => {
      const selectedAnswer = matrixAnswers.find(mA => mA.value === answer);
      return {
        question: survey2Template.targetQuestions.questions[i],
        value: selectedAnswer?.value ?? null,
        valueLabel: selectedAnswer?.valueLabel ?? null,
      }
    }),
    other: value.other,
    demographic: {
      age: value.demographic.age,
      gender: value.demographic.gender,
      country: value.demographic.country,
      relationStatus: value.demographic.relationStatus,
    }
  }
}
