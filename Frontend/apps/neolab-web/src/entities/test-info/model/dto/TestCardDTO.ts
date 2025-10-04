export interface TestCardDTO {
  id: string;
  name: string;
  testName?: string;
  testId: string;
  ownerId: string;
  state: number;
  attemptNumber: number;
  leftAttemptsCount: number;
  scoredPoints: number;
  maxPoints: number;
  leftTestTime: string;
  isChecked: boolean;
}
