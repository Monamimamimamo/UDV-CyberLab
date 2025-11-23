import { Button } from '@/shared/ui';
import clsx from 'clsx';
import { useScrollContainer } from '@/shared/hooks';

type QuestionsPreviewPaginatorProps = {
  ids: (string | undefined)[];
  current: number;
  setCurrent: (value: number) => void;
};

export const QuestionsPreviewPaginator = ({
  ids,
  current,
  setCurrent,
}: QuestionsPreviewPaginatorProps) => {
  const container = useScrollContainer();

  return (
    <div
      ref={container}
      className="relative flex gap-2 overflow-x-scroll without-scrollbar scroll-smooth p-2"
    >
      {ids.map((_, index) => {
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
