import type { TestDTO } from '@/shared/api/dto';

export interface TestResultDTO {
  id: string;
  testId: string;
  userId: string;
  attemptNumber: number;
  leftAttemptsCount: number;
  scoredPoints: number;
  leftTestTime: string;
  isChecked: boolean;
  test: TestDTO;
}
