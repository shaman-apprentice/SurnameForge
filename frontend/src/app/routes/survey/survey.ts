import { AgeOptions, SurveyResult } from "@surename-forge/shared";

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
      $localize`I associate positive feelings and attributes like "protection", "love", or "mathematically gifted" with my family name`,
      $localize`I get often called by my family name or a nickname based on my family name`,
      $localize`It is important to me what my friends think about my family`,
      $localize`It is important to me to have the same surname as my partner`,
      $localize`If I were asked, I would swap my surname for my partner's without hesitation`, 
      $localize`I would be happy, if my siblings would keep our family name when getting married`,
      $localize`I think my family would be upset, if I would drop our family name`,
    ],
    possibleAnswers: matrixAnswers,
  },
  aboutProblem: $localize`I know at least one couple, who had a long discussion about their family name before their wedding`,
  aboutAI: {
    questions: [
      $localize`I have already used AI like ChatGPT`,
      $localize`I trust in answers given by AI like ChatGPT`,
      $localize`I enjoy to talk with an AI like ChatGPT`,
    ],
    possibleAnswers: matrixAnswers,
  },
  openEnded: {
    decisionOfSurname: "",
    other: "",
  },
  demographic: {
    age: AgeOptions, 
    gender: [ $localize`diverse`, $localize`female`, $localize`male` ],
    relationStatus: [ $localize`single`, $localize`engaged`, $localize`married`, $localize`widowed`, $localize`divorced` ],
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
    aboutAI: surveyTemplate.aboutAI.questions.map(q => ({
      question: q,
      value: null,
      valueLabel: null,
    })),
    openEnded: {
      decisionForSurname: "",
      other: "",
    },
    demographic: {
      age: null,
      gender: null,
      relationStatus: null,
    }
  };
}
