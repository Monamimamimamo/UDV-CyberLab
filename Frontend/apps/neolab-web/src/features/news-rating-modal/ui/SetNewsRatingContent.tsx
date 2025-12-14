import { useSetNewsRating } from '@/entities/rating';
import { useForm } from 'react-hook-form';
import { useNewsRatingModal } from '../model/store';
import { Button, SetRating } from '@/shared/ui';
import { useState } from 'react';

export const SetNewsRatingContent = ({ newsId }: { newsId: string }) => {
  const [rating, setRating] = useState(0);
  const close = useNewsRatingModal(state => state.close);
  const { mutateAsync, isPending } = useSetNewsRating();

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    mutateAsync({ projectId: newsId, value: rating }).then(close);
  };

  return (
    <div>
      <div>
        <h4 className="text-[24px] mb-2 mx-5 text-center">Оценка новости</h4>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-center"
      >
        <SetRating rating={rating} setRating={setRating} />
        <Button
          type="submit"
          color="gradient"
          size="md"
          radius="sm"
          className="w-1/2 text-white"
          isLoading={isPending}
          isDisabled={rating === 0}
        >
          Оценить
        </Button>
        <p className="text-sm mt-1 text-center">
          Не забудьте оставить отзыв после оценки в комментариях
        </p>
      </form>
    </div>
  );
};

