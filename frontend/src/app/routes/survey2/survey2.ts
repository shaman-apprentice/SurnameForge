export const matrixAnswers = [
  { value: 4, valueLabel: $localize`Strongly Agree` },
  { value: 3, valueLabel: $localize`Agree` },
  { value: 2, valueLabel: $localize`Neutral` },
  { value: 1, valueLabel: $localize`Disagree` },
  { value: 0, valueLabel: $localize`Strongly Disagree` },
];

export const survey2Template = {
  targetQuestions: {
    questions: [
      $localize`I know my legal options regarding the choice of surname for the wedding`,
      $localize`I think legal research regarding the choice of surname for the wedding is a complicated and time consuming task`,
      $localize`I think AI like ChatGTP could be helpful regarding the choice of surname for the wedding`,
    ],
    possibleAnswers: matrixAnswers,
  },
  other: $localize`Anything else you wish to tell us?`,
  demographic: {
    age: [ '<30', '30-59', '>60' ], 
    gender: [ $localize`diverse`, $localize`female`, $localize`male` ],
    country: $localize`Where are you from`,
    relationStatus: [ $localize`single`, $localize`in a relationship`, $localize`married`, $localize`widowed`, $localize`divorced` ],
  }
};
