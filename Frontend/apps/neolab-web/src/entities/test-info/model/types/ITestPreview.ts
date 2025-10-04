import type { QuestionDTO } from '@/shared/api/dto';

export interface ITestPreview {
  id: string;
  title: string;
  totalQuestions: number;
  questions: QuestionDTO[];
}
