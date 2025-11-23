import type { QuestionDTO } from './question';

export interface TestDTO {
  id: string;
  name: string;
  description?: string | null;
  theme: string;
  difficulty: string;
  ownerId: string;
  attemptsCount?: number | null;
  startTestTime?: string | null;
  endTestTime?: string | null;
  passTestTime?: string | null;
  maxPoints: number;
  questions: QuestionDTO[];
}
