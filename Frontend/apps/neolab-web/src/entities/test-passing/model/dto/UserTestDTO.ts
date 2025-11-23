export interface UserTestDTO {
  id: string;
  testId: string;
  userId: string;
  state: 0 | 1 | 2;
  attemptNumber: number;
  leftAttemptsCount: number;
  scoredPoints: number;
  leftTestTime: string;
  isChecked: boolean;
}
