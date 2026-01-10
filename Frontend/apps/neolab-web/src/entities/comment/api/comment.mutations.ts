import { useQueryClient, useMutation } from '@tanstack/react-query';
import { commentConfig } from './comment.config';
import type { CommentIdResponse } from '../model';
import type { CommentKeys } from './types';
import { commentServices } from './services';
import { useMemo } from 'react';

export const useCreateComment = (apiKey: CommentKeys) => {
  const queryClient = useQueryClient();

  const api = useMemo(() => commentServices[apiKey], [apiKey]);

  const { mutateAsync, ...rest } = useMutation({
    ...commentConfig.createComment(api),
    onSuccess: (data: CommentIdResponse) => {
      queryClient.invalidateQueries({ queryKey: [api.key, data.cardId] });
    },
  });

  return { createComment: mutateAsync, ...rest };
};

export const useUpdateComment = (apiKey: CommentKeys) => {
  const queryClient = useQueryClient();

  const api = useMemo(() => commentServices[apiKey], [apiKey]);

  const { mutateAsync, ...rest } = useMutation({
    ...commentConfig.updateComment(api),
    onSuccess: (data: CommentIdResponse) => {
      queryClient.invalidateQueries({ queryKey: [api.key, data.cardId] });
    },
  });

  return { updateComment: mutateAsync, ...rest };
};

export const useDeleteComment = (apiKey: CommentKeys) => {
  const queryClient = useQueryClient();

  const api = useMemo(() => commentServices[apiKey], [apiKey]);

  const { mutateAsync, ...rest } = useMutation({
    ...commentConfig.deleteComment(api),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.key] });
    },
  });

  return { deleteComment: mutateAsync, ...rest };
};


export const useDeleteCommentAsAdmin = (apiKey: CommentKeys) => {
  const queryClient = useQueryClient();

  const api = useMemo(() => commentServices[apiKey], [apiKey]);

  const { mutateAsync, ...rest } = useMutation({
    ...commentConfig.deleteCommentAsAdmin(api),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.key] });
    },
  });

  return { deleteComment: mutateAsync, ...rest };
};
