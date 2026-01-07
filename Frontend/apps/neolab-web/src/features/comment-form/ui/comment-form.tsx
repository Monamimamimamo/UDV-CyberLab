import { useCommentForm, useCreateComment, type CommentEntity } from '@/entities/comment';
import { useUser } from '@/entities/user';
import { Button, Card, Textarea } from '@/shared/ui';
import { Controller } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';

type CommentFormProps = CommentEntity & {
  label?: string;
};

export const CommentForm = ({
  entityKey,
  entityId,
  label = 'Добавить комментарий',
}: CommentFormProps) => {
  const user = useUser();
  const { createComment, isPending } = useCreateComment(entityKey);

  const { onSubmit, control, errors } = useCommentForm((data) => {
    if (user) {
      return createComment({ ...data, cardId: entityId, userName: user.userName });
    }
  });

  return (
    <Card className="drop-shadow-base custom-outline flex min-h-[80px] w-full flex-row gap-4 rounded-xl px-[15px] pt-[10px] pb-[20px]">
      <form onSubmit={onSubmit} className="flex w-full flex-row gap-1">
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              label={label}
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
        <div>
          <Button
            isIconOnly
            type="submit"
            fullWidth
            variant="flat"
            size="md"
            radius="sm"
            disabled={isPending}
            isLoading={isPending}
            className="border-foreground/10"
          >
            <IoSend className="text-[22px]" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
