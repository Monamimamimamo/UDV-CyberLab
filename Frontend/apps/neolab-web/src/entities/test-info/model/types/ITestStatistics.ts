export interface ITestStatistics {
  testId: string;
  title: string;
  maxScore: number;
  users: ITestStatisticsItem[];
}

export interface ITestStatisticsItem {
  id: string;
  attemptId: string;
  name: string;
  score: number;
}
