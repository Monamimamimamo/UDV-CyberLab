import {
  CommentCardDetails,
  useUpdateComment,
  useCommentForm,
  type Comment,
} from '@/entities/comment';
import { useClickOutside, useKeyDown } from '@/shared/hooks';
import { Button, Card, Textarea, UserImage } from '@/shared/ui';
import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { IoCloseOutline, IoSend } from 'react-icons/io5';
import { useCommentsContext } from '../model/comments-provider';

type CommentEditFormProps = {
  comment: Comment;
  onExit: () => void;
};

export const CommentEditForm = ({ comment, onExit }: CommentEditFormProps) => {
  const { entityKey } = useCommentsContext();

  const { updateComment, isPending } = useUpdateComment(entityKey);

  const { onSubmit, control, errors, setFocus, isDirty } = useCommentForm(
    (data) => updateComment({ ...data, id: comment.id }).finally(onExit),
    { text: comment.text || '' },
  );

  useEffect(() => {
    setFocus('text');
  }, [setFocus]);

  const ref = useRef<HTMLDivElement>(null);

  useKeyDown('Escape', () => onExit, [onExit]);
  useClickOutside(ref, () => onExit());

  return (
    <Card
      ref={ref}
      className="drop-shadow-base custom-outline flex min-h-[80px] w-full flex-row gap-2 rounded-xl px-[15px] pt-[10px] pb-[20px] sm:gap-4"
    >
      <div className="hidden sm:block">
        <UserImage username={comment.authorName} />
      </div>
      <div className="w-full">
        <CommentCardDetails comment={comment} />
        <form onSubmit={onSubmit} className="flex w-full flex-row gap-1">
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                label="Отредактировать комментарий"
                minRows={2}
                maxRows={8}
                radius="sm"
                color={errors.text !== undefined ? 'danger' : 'default'}
                isInvalid={errors.text !== undefined}
                errorMessage={errors.text?.message}
                {...field}
                placeholder="Текст комментария..."
                className="w-full"
              />
            )}
          />
          <div className="flex flex-col gap-1">
            <Button
              isIconOnly
              type="submit"
              fullWidth
              size="md"
              radius="sm"
              isDisabled={isPending || !isDirty}
              isLoading={isPending}
            >
              <IoSend className="text-[22px]" />
            </Button>
            <Button
              onPress={onExit}
              isIconOnly
              type="button"
              fullWidth
              className="bg-danger/5 hover:bg-danger/10 border-danger-400/20 text-rose-500"
              size="md"
              radius="sm"
            >
              <IoCloseOutline className="text-[30px]" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
