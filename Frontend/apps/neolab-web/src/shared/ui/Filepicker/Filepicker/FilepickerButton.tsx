import clsx from 'clsx';
import { Button } from '../../Button';
import { IconSwitcher } from './IconSwitcher';
import { useDragAndDrop } from '../hooks';

type FilepickerButtonProps = {
  currentFile: File | null;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  handleFileChange?: (file: File) => void;
  handleClick?: () => void;
};

export const FilepickerButton = ({
  currentFile,
  handleFileChange,
  handleClick,
  isSelected,
  setIsSelected,
}: FilepickerButtonProps) => {
  const { isDragOver, handleDrop, handleDragOver, handleDragLeave } =
    useDragAndDrop({
      currentFile,
      isSelected,
      setIsSelected,
      handleFileChange,
    });

  return (
    <Button
      isDisabled={!handleFileChange}
      className={clsx(
        'border-2 duration-300 border-dashedz',
        isDragOver ? 'border-foreground' : 'border-foreground/60'
      )}
      color="secondary"
      onPress={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      radius="sm"
      startContent={
        <IconSwitcher isSelected={isSelected} isDragOver={isDragOver} />
      }
    >
      <span className={isDragOver ? 'animate-pulse duration-300' : ''}>
        {isSelected ? 'Файл выбран' : 'Выберите файл'}
      </span>
    </Button>
  );
};
