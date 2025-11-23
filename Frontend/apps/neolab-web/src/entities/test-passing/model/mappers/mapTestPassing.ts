import type { TestDTO } from '@/shared/api/dto';
import type { ITestPassing } from '../types';

export const mapTestPassing = (dto: {
  testInfo: TestDTO;
  leftTestTime: string;
  userTestId: string;
}): ITestPassing => ({
  testId: dto.testInfo.id,
  userTestId: dto.userTestId,
  title: dto.testInfo.name,
  totalQuestions: dto.testInfo.questions.length,
  questions: dto.testInfo.questions,
  leftTestTime: dto.leftTestTime,
});
