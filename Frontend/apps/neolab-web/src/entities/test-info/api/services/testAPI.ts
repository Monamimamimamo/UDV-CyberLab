import { axiosClient } from '@/shared/api';
import type {
  TestCardDTO,
  CreateTestDTO,
  UpdateTestDTO,
  TestDetailsDTO,
  TestStatisticsDTO,
  TestResultDTO,
  TestPreviewDTO,
  TestAttemptDTO,
} from '../../model/dto';
import type {
  ITestPreview,
  ITestCard,
  ITestDetails,
  ITestStatistics,
  ITestResult,
} from '../../model/types';
import {
  mapTestPreview,
  mapTestCard,
  mapTestDetails,
  mapTestStatistics,
  mapTestResult,
} from '../../model/mappers';
import type { IProfile, TestDTO } from '@/shared/api/dto';

type GetTestsParams = {
  search?: string;
  subject?: string;
  difficulty?: string;
};

class TestApi {
  public async getTestDetailsById(id: string): Promise<ITestDetails> {
    const response = await axiosClient.get<TestDetailsDTO>(`/api/Test/${id}/short`);
    return mapTestDetails(response);
  }

  public async getTestResultsById(id: string): Promise<ITestResult> {
    const response = await axiosClient.get<TestResultDTO[]>(`/api/Test/${id}/results`);
    return mapTestResult(response);
  }

  public async getUserTestById(attemptId: string): Promise<TestAttemptDTO> {
    const response = await axiosClient.get<TestAttemptDTO>(`/api/Test/results/${attemptId}`);
    return response;
  }

  public async getUserTestPreviewById({
    id,
    attemptId,
  }: {
    id: string;
    attemptId: string;
  }): Promise<{ test: TestDTO; answers: TestPreviewDTO }> {
    const test = await axiosClient.get<TestDTO>(`/api/Test/${id}`);
    const answers = await axiosClient.get<TestPreviewDTO>(`/api/Test/results/${attemptId}/preview`);
    return { test, answers };
  }

  public async getTestStatisticsById(id: string): Promise<ITestStatistics> {
    try {
      const response = await axiosClient.get<TestStatisticsDTO[]>(`/api/Test/statistics/${id}`);

      const users = await axiosClient.get<IProfile[]>('/api/user/users');

      return mapTestStatistics(
        response.map((dto) => ({
          ...dto,
          userName: users.find((user) => user.userId === dto.userId)?.userName || 'Неизвестный',
        })),
      );
    } catch {
      return {
        testId: '',
        title: 'Статистика по тесту пуста',
        maxScore: 0,
        users: [],
      };
    }
  }

  public async deleteTestById(id: string): Promise<void> {
    await axiosClient.delete(`/api/Test/${id}`);
  }

  public async createTest(body: CreateTestDTO): Promise<string> {
    return await axiosClient.post('/api/Test', body);
  }

  public async updateTestById(body: UpdateTestDTO): Promise<string> {
    return await axiosClient.put('/api/Test', body);
  }

  public async getTestPreviewById(id: string): Promise<ITestPreview> {
    const response = await axiosClient.get<TestDTO>(`/api/Test/${id}`);
    return mapTestPreview(response);
  }

  public async getTests(params: GetTestsParams): Promise<ITestCard[]> {
    const response = await axiosClient.get<TestCardDTO[]>('/api/Test', {
      params,
    });
    return response.map(mapTestCard);
  }

  public async getMyTests(): Promise<ITestCard[]> {
    const response = await axiosClient.get<TestCardDTO[]>('/api/Test/my');
    return response.map(mapTestCard);
  }

  public async getPassedTests(): Promise<ITestCard[]> {
    const response = await axiosClient.get<TestCardDTO[]>('/api/Test/passed');
    return response.map(mapTestCard);
  }

  public async getCreatedTests(): Promise<ITestCard[]> {
    const response = await axiosClient.get<TestCardDTO[]>('/api/Test/created');
    return response.map(mapTestCard);
  }
}

export const testApi = new TestApi();
