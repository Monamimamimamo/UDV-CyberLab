import { axiosClient } from '@/shared/api';
import type { CreateCommentDTO } from '../../model/dto/CreateCommentDTO';
import type { CommentDTO } from '../../model/dto/CommentDTO';
import type { UpdateCommentDTO } from '../../model/dto/UpdateCommentDTO';

type CommentResponse = { projectId: string };

class CommentApi {
  public async getByProjectId(projectId: string): Promise<CommentDTO[]> {
    return await axiosClient.get(`/api/Comment/project/${projectId}`);
  }

  public async create(body: CreateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.post('/api/Comment', body);
  }

  public async update(body: UpdateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.put('/api/Comment', body);
  }

  public async delete(id: string): Promise<boolean> {
    return await axiosClient.delete(`/api/Comment/${id}`);
  }
}

export const commentApi = new CommentApi();
