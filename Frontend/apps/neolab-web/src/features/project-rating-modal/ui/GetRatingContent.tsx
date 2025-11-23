import type { RatingDTO } from '@/entities/rating';
import { Rating } from '@/shared/ui';

export const GetRatingContent = ({ data }: { data: RatingDTO }) => {
  return (
    <div className="flex items-center flex-col gap-2 w-full">
      <p className="text-2xl w-fit">Вы уже оценивали проект!</p>
      <div className="w-fit">
        <Rating starSize={50} rating={data.userRating!} />
      </div>
      <p className="mt-2 max-w-[350px] text-center text-sm">
        Пожалуйста, поделитесь своими мыслями о проекте в комментариях.
      </p>
    </div>
  );
};
