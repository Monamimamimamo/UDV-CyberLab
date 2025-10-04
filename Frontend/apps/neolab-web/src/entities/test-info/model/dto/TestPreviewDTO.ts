export interface TestPreviewDTO {
  userId: string;
  questions: PreviewQuestionDTO[];
}

export interface PreviewQuestionDTO {
  sortOrder: number;
  questionId: string;
  questionText: string;

  isCorrect: boolean;

  userAnswerText: string;
  correctAnswerText: string;

  userChoices: number[];
  correctChoices: number[]

  userCompliances: { [key: string]: string };
  correctCompliances: { [key: string]: string };

  hasUserFile: boolean;
}
