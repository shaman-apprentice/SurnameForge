export type SurveyResult = {
  aboutSurname: MatrixAnswer[];
  aboutProblem: boolean | null;
  aboutAI: {
    howOften: string | null;
    matrix: MatrixAnswer[];
  };
  openEnded: {
    decisionForSurname: string;
    other: string;
  };
  demographic: {
    age: string | null;
    gender: string | null;
    relationStatus: string | null;
  };
}

export const AgeOptions = [ "<30", "30-59", ">60" ] as const;

export type MatrixAnswer = {
  value: number | null;
  valueLabel: string | null;
  question: string;
}
