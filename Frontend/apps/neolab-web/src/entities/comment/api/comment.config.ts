import { queryOptions, mutationOptions } from '@tanstack/react-query';
import type { Comment } from '../model';
import type { CommentApiService } from './comment-api.service';

export const getComments = (api: CommentApiService, id: string) =>
  queryOptions({
    queryKey: [api.key, id],
    queryFn: async () => await api.getAllById(id),
    select: (comments): Comment[] => comments,
    staleTime: 5 * 1000,
  });

export const createComment = (api: CommentApiService) =>
  mutationOptions({
    mutationKey: [`${api.key}/create`],
    mutationFn: api.create,
  });

export const updateComment = (api: CommentApiService) =>
  mutationOptions({
    mutationKey: [`${api.key}/update`],
    mutationFn: api.update,
  });

export const deleteComment = (api: CommentApiService) =>
  mutationOptions({
    mutationKey: [`${api.key}/delete`],
    mutationFn: api.delete,
  });

export const commentConfig = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
