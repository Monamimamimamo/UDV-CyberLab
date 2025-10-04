import { CommentDetails, type CommentDTO, useUpdateComment } from '@/entities/comment';
import { Button, Card, Textarea, UserImage } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { IoSend, IoCloseOutline } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import { useClickOutside, useKeyDown } from '@/shared/hooks';

const commentSchema = z.object({
  text: z.string().trim().min(1, 'Комментарий не может быть пустым'),
});

type CommentInput = z.infer<typeof commentSchema>;

type CommentActionsProps = {
  comment: CommentDTO;
  onExit: () => void;
};

export const CommentEditForm = ({ comment, onExit }: CommentActionsProps) => {
  const { mutateAsync: updateComment, isPending } = useUpdateComment();

  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors, isDirty },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: { text: comment.text || '' },
  });

  useEffect(() => {
    setFocus('text');
  }, [setFocus]);

  const onReset = () => {
    onExit();
    reset({
      text: '',
    });
  };

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    updateComment({ ...data, id: comment.id }).finally(onReset);
  };

  const ref = useRef<HTMLDivElement>(null);

  useKeyDown('Escape', () => onExit(), [onExit]);
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
        <CommentDetails comment={comment} />
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row gap-1">
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                label="Отредактировать комментарий"
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
              variant="faded"
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
              variant="faded"
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
