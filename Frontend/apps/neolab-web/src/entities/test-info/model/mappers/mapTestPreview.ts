import type { TestDTO } from '@/shared/api/dto';
import type { ITestPreview } from '../types/ITestPreview';

export const mapTestPreview = (dto: TestDTO): ITestPreview => ({
  id: dto.id,
  title: dto.name,
  totalQuestions: dto.questions.length,
  questions: dto.questions,
});
