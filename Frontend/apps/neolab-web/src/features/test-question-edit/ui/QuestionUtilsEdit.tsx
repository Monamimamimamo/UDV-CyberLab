import { Button, Input } from '@/shared/ui';
import { memo } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

type QuestionUtilsEditProps = {
  points: number;
  handleDeleteQuestion: () => void;
  handleChangePoints: (e: string) => void;
};

export const QuestionUtilsEdit = memo(
  ({
    points,
    handleDeleteQuestion,
    handleChangePoints,
  }: QuestionUtilsEditProps) => {
    return (
      <div className="flex justify-between mt-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-[13px]">Баллы: </p>
          <Input
            value={String(points)}
            onValueChange={handleChangePoints}
            color="white"
            classNames={{
              base: 'w-[50px]',
            }}
            type="number"
            max={100}
            min={0}
            placeholder="0"
            aria-label="Баллы за вопрос"
          />
        </div>
        <Button
          onPress={handleDeleteQuestion}
          variant="light"
          size="md"
          radius="sm"
          isIconOnly
        >
          <FaTrashAlt size={22} />
        </Button>
      </div>
    );
  }
);
