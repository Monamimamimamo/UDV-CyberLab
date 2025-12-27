import { useQuery } from '@tanstack/react-query';
import { getComments } from './comment.config';
import type { CommentKeys } from './types';
import { commentServices } from './services';

export const useComments = (apiKey: CommentKeys, entityId: string) => {
  const { data, ...rest } = useQuery(getComments(commentServices[apiKey], entityId));
  return { comments: data, ...rest };
};
