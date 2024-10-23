import type { SurveyResult } from "@surename-forge/shared";

export const matrixAnswers = [
  { value: 4, valueLabel: $localize`Strongly Agree` },
  { value: 3, valueLabel: $localize`Agree` },
  { value: 2, valueLabel: $localize`Neutral` },
  { value: 1, valueLabel: $localize`Disagree` },
  { value: 0, valueLabel: $localize`Strongly Disagree` },
] as const;

export const surveyTemplate = {
  aboutSurname: {
    questions: [
      $localize`I associate feelings and attributes like "protection", "love", or "mathematically gifted" with my family`,
      $localize`It is important to me what my friends think about my family`,
      $localize`My friends often call me by my family name or a nickname based on my family name`,
      $localize`It is important to me to have the same surname as my partner`,
      $localize`I would swap my surname for my partner's without hesitation`, 
      $localize`I would be happy, if my siblings would keep our family name when getting married`,
      $localize`I think my family would be upset, if I would drop our family name`,
    ],
    possibleAnswers: matrixAnswers,
  },
  aboutProblem: {
    question: $localize`I know at least one couple, who had a long discussion about their family name before their wedding`,
    options: [ $localize`Yes`, $localize`No` ],
  },
  aboutAI: {
    howOften: {
      question: $localize`How often have you used AI like ChatGPT`,
      options: [ "0", "1-9", "10-100", ">100" ],
    },
    matrix: {
      questions: [
        $localize`I trust in answers given by AI like ChatGPT`,
        $localize`I enjoy to talk with an AI like ChatGPT`,
      ],
      possibleAnswers: matrixAnswers,
    }
  },
  openEnded: {
    decisionOfSurname: $localize`If you have already married, what was the reasoning for your chosen surname?`,
    other: $localize`Anything else you wish to tell us?`,
  },
  demographic: {
    age: [ '<30', '30-59', '>60' ], 
    gender: [ $localize`diverse`, $localize`female`, $localize`male` ],
    relationStatus: [ $localize`single`, $localize`in a relationship`, $localize`married`, $localize`widowed`, $localize`divorced` ],
  }
};

export function createSurvey(): SurveyResult {
  return {
    aboutSurname: surveyTemplate.aboutSurname.questions.map(q => ({
      question: q,
      value: null,
      valueLabel: null,
    })),
    aboutProblem: null,
    aboutAI: {
      howOften: null,
      matrix: surveyTemplate.aboutAI.matrix.questions.map(q => ({
        question: q,
        value: null,
        valueLabel: null,
      }))
    },
    openEnded: {
      decisionForSurname: surveyTemplate.openEnded.decisionOfSurname,
      other: surveyTemplate.openEnded.other,
    },
    demographic: {
      age: null,
      gender: null,
      relationStatus: null,
    }
  };
}
