import { MatrixAnswer } from "./matrixAnswer.model";

export type Survey2Result = {
  /**
   * howSureAreYouAboutYourNameOptions: MatrixAnswer;
   * howDifficultIsLegalResearch: MatrixAnswer;
   * isAIHelpful: MatrixAnswer;
   */
  targetQuestions: MatrixAnswer[];
  other: string | null;
  demographic: {
    age: string | null;
    gender: string | null;
    country: string | null;
    relationStatus: string | null;
  };
}
