import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { commentSchema, type CommentInputs } from '../comment.schema';
import type { CommentIdResponse } from '../dtos/comment-id-response';

export const useCommentForm = (
  callback: (data: CommentInputs) => Promise<CommentIdResponse> | void,
  defaultValues?: CommentInputs,
) => {
  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isDirty },
  } = useForm<CommentInputs>({
    resolver: zodResolver(commentSchema),
    defaultValues,
  });

  const onReset = () => {
    reset({ text: '' });
  };

  const onSubmit: SubmitHandler<CommentInputs> = (data) => {
    callback(data)?.finally(onReset);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    onReset,
    control,
    errors,
    isDirty,
    setFocus,
  };
};
