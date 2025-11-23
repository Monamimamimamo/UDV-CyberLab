import { axiosClient } from '@/shared/api';
import type {
  CreateComplianceQuestionDTO,
  CreateFileQuestionDTO,
  CreateOpenQuestionDTO,
  CreateVariantQuestionDTO,
  TestEditingDTO,
  UpdateQuestionDTO,
} from '../../model/dto';
import type { QuestionDTO } from '@/shared/api/dto';

class TestEditingApi {
  public async getTestForEditingById(id: string): Promise<TestEditingDTO> {
    return await axiosClient.get(`/api/Test/${id}?isNeedAnswer=true`);
  }

  public async getQuestionById(id: string): Promise<QuestionDTO> {
    return await axiosClient.get(`/api/Questions/${id}`);
  }

  public async updateQuestionById(body: UpdateQuestionDTO): Promise<void> {
    return await axiosClient.put('/api/Questions', body);
  }

  public async deleteQuestionById(id: string): Promise<void> {
    return await axiosClient.delete(`/api/Questions/${id}`);
  }

  public async createComplianceQuestion(body: CreateComplianceQuestionDTO): Promise<void> {
    return await axiosClient.post('/api/Questions/compliance', body);
  }

  public async createFileQuestion(body: CreateFileQuestionDTO): Promise<void> {
    return await axiosClient.post('/api/Questions/file', body);
  }

  public async createTextQuestion(body: CreateOpenQuestionDTO): Promise<void> {
    return await axiosClient.post('/api/Questions/open', body);
  }

  public async createVariantQuestion(body: CreateVariantQuestionDTO): Promise<void> {
    return await axiosClient.post('/api/Questions/variant', body);
  }
}

export const testEditingApi = new TestEditingApi();
