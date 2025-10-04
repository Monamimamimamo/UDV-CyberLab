import { Button } from '@/shared/ui';
import clsx from 'clsx';
import { useScrollContainer } from '@/shared/hooks';
import { useAnswers } from '@/entities/test-passing';

type QuestionsPaginatorProps = {
  current: number;
  setCurrent: (value: number) => void;
};

export const QuestionsPaginator = ({
  current,
  setCurrent,
}: QuestionsPaginatorProps) => {
  const questions = useAnswers(state => state.answers).map(answer => Boolean(answer.data));
  const container = useScrollContainer();
  
  return (
    <div
      ref={container}
      className="relative flex gap-2 overflow-x-scroll without-scrollbar scroll-smooth p-2"
    >
      {questions.map((has, index) => {
        index += 1;
        return (
          <Button
            size="md"
            color="white"
            isIconOnly
            key={index}
            disabled={index === current}
            className={clsx(
              'text-[18px] !duration-300',
              index === current
                ? 'bg-foreground text-white'
                : has
                  ? 'bg-secondary'
                  : 'bg-white text-foreground'
            )}
            onPress={() => setCurrent(index)}
          >
            {index}
          </Button>
        );
      })}
    </div>
  );
};
