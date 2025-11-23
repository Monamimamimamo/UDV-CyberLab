import type { QuestionDTO } from '@/shared/api/dto';
import type { SavedAnswerWithKey } from '../dto';

export interface ITestPassing {
  testId: string;
  userTestId: string;
  title: string;
  totalQuestions: number;
  leftTestTime?: string;
  questions: QuestionDTO[];
}

export interface ITestPassingSavedAnswers {
  savedAnswers: SavedAnswerWithKey[];
}