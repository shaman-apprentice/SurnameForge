import { MatrixAnswer } from "./matrixAnswer.model";

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
