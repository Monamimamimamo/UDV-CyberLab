import type { QuestionDTO } from '@/shared/api/dto';

export interface TestEditingDTO {
  id: string;

  // Title Edit
  name: string;
  theme: string;
  difficulty: string;

  // Settings Edit
  attemptsCount: number;
  startTestTime: string;
  endTestTime: string;
  passTestTime?: string;

  description: string;
  ownerId: string;
  maxPoints: number;
  questionsCount: number;

  questions: QuestionDTO[];
}
