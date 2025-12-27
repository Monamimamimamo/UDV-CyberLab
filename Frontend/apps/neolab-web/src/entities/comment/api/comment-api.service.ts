import { axiosClient } from '@/shared/api';
import type {
  CommentResponse,
  CreateCommentRequest,
  CommentIdResponse,
  UpdateCommentRequest,
} from '../model';

export class CommentApiService {
  constructor(
    private readonly baseHref: string,
    public readonly key: string,
  ) {}

  public getAllById = async (id: string): Promise<CommentResponse[]> =>
    await axiosClient.get(`${this.baseHref}/${id}`);

  public create = async (body: CreateCommentRequest): Promise<CommentIdResponse> =>
    await axiosClient.post(this.baseHref, body);

  public update = async (body: UpdateCommentRequest): Promise<CommentIdResponse> =>
    await axiosClient.put(this.baseHref, body);

  public delete = async (commentId: string): Promise<boolean> =>
    await axiosClient.delete(`${this.baseHref}/${commentId}`);
}
