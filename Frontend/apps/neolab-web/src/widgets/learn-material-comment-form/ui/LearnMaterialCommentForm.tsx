import { useCreateLearnMaterialsComment } from '@/entities/comment';
import { useUser } from '@/entities/user';
import { Button, Card, Textarea } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';
import { z } from 'zod';

const commentSchema = z.object({
  text: z.string().trim().min(1, 'Комментарий не может быть пустым'),
});

type CommentInput = z.infer<typeof commentSchema>;

export const LearnMaterialCommentForm = ({ materialId }: { materialId: string }) => {
  const user = useUser();
  const { mutateAsync: createComment, isPending } = useCreateLearnMaterialsComment();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
  });

  const onReset = () => {
    reset({
      text: '',
    });
  };

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    if (user?.userName) {
      createComment({ ...data, cardId: materialId, userName: user?.userName }).finally(onReset);
    }
  };

  return (
    <Card className="drop-shadow-base custom-outline flex min-h-[80px] w-full flex-row gap-4 rounded-xl px-[15px] pt-[10px] pb-[20px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row gap-1">
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              label="Добавить комментарий к учебному материалу"
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
            variant="faded"
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
