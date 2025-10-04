export interface TestAttemptDTO {
  id: string;
  attemptNumber: number;
  testName: string;
  maxPoints: number;
  scoredPoints: number;
  questions: Array<{
    id: string;
    scoredPoints: number;
    maxPoints: number;
  }>;
}
