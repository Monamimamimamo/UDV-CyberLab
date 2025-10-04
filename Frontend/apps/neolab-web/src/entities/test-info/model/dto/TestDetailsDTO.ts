export interface TestDetailsDTO {
  testId: string;
  name: string;
  description: string;
  theme: string;
  difficulty: string;
  ownerId: string;
  state: number;
  attemptNumber: number;
  leftAttemptsCount: number;
  scoredPoints: number;
  maxPoints: number;

  leftTestTime: string;
  startTestTime: string;
  endTestTime: string;
  passTestTime: string;

  isChecked: boolean;
}
