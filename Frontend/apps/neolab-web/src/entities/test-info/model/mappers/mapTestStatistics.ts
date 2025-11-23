import type { TestStatisticsDTO } from '../dto/TestStatisticsDTO';
import type { ITestStatistics, ITestStatisticsItem } from '../types/ITestStatistics';

type TestStatisticsDTOWithUserName = TestStatisticsDTO & {
  userName: string;
};

export const mapTestStatistics = (dto: TestStatisticsDTOWithUserName[]): ITestStatistics => ({
  testId: dto[0].userTestId,
  title: dto[0].testName,
  maxScore: dto[0].testPoints,
  users: dto.map(mapTestStatisticsItem),
});

const mapTestStatisticsItem = (dto: TestStatisticsDTOWithUserName): ITestStatisticsItem => ({
  attemptId: dto.userTestId,
  id: dto.userId,
  name: dto.userName,
  score: dto.points,
});
