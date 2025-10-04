import { axiosClient } from '@/shared/api';
import type { ITestPassing } from '../../model/types/ITestPassing';
import type { SavedAnswer, SavedAnswersDTO, UserTestDTO } from '../../model/dto';
import type { TestDTO } from '@/shared/api/dto';
import { mapTestPassing } from '../../model/mappers';

type SaveAnswerType = {
  id: string;
  body: SavedAnswersDTO;
};

class TestPassingApi {
  public async getSavedAnswers(id: string): Promise<SavedAnswer[]> {
    try {
      const answers = await axiosClient.get<SavedAnswersDTO>(`/api/TestPassing/${id}/answers`);

      const savedAnswers = [
        ...answers.openAnswers,
        ...answers.variantAnswers,
        ...answers.complianceAnswers,
        ...answers.fileAnswers,
      ];

      return savedAnswers;
    } catch {
      return [];
    }
  }

  public async startTest(id: string): Promise<{ userTestId: string }> {
    return await axiosClient.post(`/api/TestPassing/${id}/start`, {});
  }

  public async saveAnswer({ id, body }: SaveAnswerType): Promise<void> {
    return await axiosClient.post(`/api/TestPassing/${id}/answer`, body);
  }

  public async finishTest(id: string): Promise<void> {
    return await axiosClient.post(`/api/TestPassing/${id}/finish`, {});
  }

  public async getPassingTestById({
    id,
    attemptId,
  }: {
    id: string;
    attemptId: string;
  }): Promise<ITestPassing | null> {
    try {
      const test = await axiosClient.get<TestDTO>(`/api/Test/${id}`);
      const userTest = await axiosClient.get<UserTestDTO>(`/api/Test/userTest/${attemptId}`);

      return mapTestPassing({
        testInfo: test,
        userTestId: attemptId,
        leftTestTime: userTest.leftTestTime,
      });
    } catch (e) {
      const error = e as Error & { status: number };
      if (error.status === 404 || error.status === 500) return null;
      return null;
    }
  }
}

export const testPassingApi = new TestPassingApi();
