import type { TestCardDTO } from '../dto';
import type { ITestCard } from '../types';
import { mapStateToStatus } from './mapStateToStatus';

export const mapTestCard = (dto: TestCardDTO): ITestCard => ({
  id: dto.testId || dto.id,
  owner: dto.ownerId,
  title: dto.testName || dto.name || '',
  totalPoints: dto.maxPoints,
  currentPoints: dto.scoredPoints,
  status: mapStateToStatus(dto.state),
});
