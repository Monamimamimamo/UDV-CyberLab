import { Button } from '@/shared/ui';
import { memo } from 'react';
import { IoAdd } from 'react-icons/io5';

export const AddNewButton = memo(
  ({ handleAddQuestion }: { handleAddQuestion: () => void }) => (
    <div className="flex justify-center">
      <Button
        onPress={handleAddQuestion}
        variant="light"
        size="md"
        radius="md"
        className="w-[120px]"
        isIconOnly
      >
        <IoAdd size={28} />
      </Button>
    </div>
  )
);
