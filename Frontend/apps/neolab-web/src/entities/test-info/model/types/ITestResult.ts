export interface ITestResult {
  testId: string;
  title: string;
  totalAttempts: number;
  attempts: ITestResultItem[];
}

export interface ITestResultItem {
  attemptId: string;
  attempt: number;
  maxScore: number;
  score: number;
}
