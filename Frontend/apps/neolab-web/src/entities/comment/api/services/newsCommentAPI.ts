import { axiosClient } from '@/shared/api';
import type { CreateCommentDTO } from '../../model/dto/CreateCommentDTO';
import type { CommentDTO } from '../../model/dto/CommentDTO';
import type { UpdateCommentDTO } from '../../model/dto/UpdateCommentDTO';

type CommentResponse = { cardId: string };

class NewsCommentApi {
  public async getByNewsId(newsId: string): Promise<CommentDTO[]> {
    return await axiosClient.get(`/api/NewsComment/${newsId}`);
  }

  public async create(body: CreateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.post('/api/NewsComment', body);
  }

  public async update(body: UpdateCommentDTO): Promise<CommentResponse> {
    return await axiosClient.put('/api/NewsComment', body);
  }

  public async delete(id: string): Promise<boolean> {
    return await axiosClient.delete(`/api/NewsComment/${id}`);
  }
}

export const newsCommentApi = new NewsCommentApi();
