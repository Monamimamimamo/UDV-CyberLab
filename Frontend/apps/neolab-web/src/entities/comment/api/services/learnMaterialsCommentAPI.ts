import { axiosClient } from '@/shared/api';
import type { CreateCommentDTO } from '../../model/dto/CreateCommentDTO';
import type { CommentDTO } from '../../model/dto/CommentDTO';
import type { UpdateCommentDTO } from '../../model/dto/UpdateCommentDTO';

type CommentResponse = { cardId: string };

class LearnMaterialsCommentApi {
  public async getByMaterialId(materialId: string): Promise<CommentDTO[]> {
    return await axiosClient.get(`/api/LearnMaterialsComment/${materialId}`);
  }

  public async create(body: CreateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.post('/api/LearnMaterialsComment', body);
  }

  public async update(body: UpdateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.put('/api/LearnMaterialsComment', body);
  }

  public async delete(id: string): Promise<boolean> {
    return await axiosClient.delete(`/api/LearnMaterialsComment/${id}`);
  }
}

export const learnMaterialsCommentApi = new LearnMaterialsCommentApi();
