import { Button } from '../Button';
import { MdOutlineRestartAlt } from 'react-icons/md';

export const SomethingWentWrongError = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary?: () => void;
}) => (
  <div className="flex justify-center mt-[20px] w-full">
    <div className="max-w-[400px] w-full flex flex-col items-center">
      <p className="break-all line-clamp-2 text-rose-500 font-semibold">
        {error.message}
      </p>
      <p className="text-second mb-2.5">Что-то пошло не так!</p>
      {resetErrorBoundary && (
        <Button
          startContent={<MdOutlineRestartAlt size={22} />}
          size="md"
          radius="sm"
          className="bg-foreground/5 text-foreground/90 font-semibold"
          variant="light"
          onPress={resetErrorBoundary}
        >
          Повторить
        </Button>
      )}
    </div>
  </div>
);
