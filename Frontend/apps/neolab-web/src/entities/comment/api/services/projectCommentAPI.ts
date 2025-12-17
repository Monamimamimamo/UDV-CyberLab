import { axiosClient } from '@/shared/api';
import type { CreateCommentDTO } from '../../model/dto/CreateCommentDTO';
import type { CommentDTO } from '../../model/dto/CommentDTO';
import type { UpdateCommentDTO } from '../../model/dto/UpdateCommentDTO';

type CommentResponse = { cardId: string };

class ProjectCommentApi {
  public async getByProjectId(projectId: string): Promise<CommentDTO[]> {
    return await axiosClient.get(`/api/ProjectComment/${projectId}`);
  }

  public async create(body: CreateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.post('/api/ProjectComment', body);
  }

  public async update(body: UpdateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.put('/api/ProjectComment', body);
  }

  public async delete(id: string): Promise<boolean> {
    return await axiosClient.delete(`/api/ProjectComment/${id}`);
  }
}

export const projectCommentApi = new ProjectCommentApi();
