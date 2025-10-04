import { getTestDifficulty } from '../../utils/getTestDifficulty';
import { getTestSubject } from '../../utils/getTestSubject';
import type { TestDetailsDTO } from '../dto';
import type { ITestDetails } from '../types';
import { mapStateToStatus } from './mapStateToStatus';

export const mapTestDetails = (dto: TestDetailsDTO): ITestDetails => ({
  id: dto.testId,
  owner: dto.ownerId,
  title: dto.name,
  difficulty: getTestDifficulty(dto.difficulty),
  subject: getTestSubject(dto.theme),
  startDate: dto.startTestTime,
  endDate: dto.endTestTime,
  duration: dto.passTestTime,
  leftAttempts: dto.leftAttemptsCount,
  totalPoints: dto.maxPoints,
  currentPoints: dto.scoredPoints,
  status: mapStateToStatus(dto.state),
});
