import { useCallback, useState } from 'react';

type UseDragAndDropProps = {
  currentFile: File | null;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
  handleFileChange?: (file: File) => void;
};

export const useDragAndDrop = ({
  currentFile,
  isSelected,
  setIsSelected,
  handleFileChange,
}: UseDragAndDropProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragOver(false);
      const file = event.dataTransfer.files?.[0];
      if (file) {
        if (handleFileChange) {
          setIsSelected(true);
          handleFileChange(file);
        }
      }
    },
    [handleFileChange, setIsSelected]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      if (currentFile && isSelected) {
        setIsSelected(false);
      }
      setIsDragOver(true);
    },
    [currentFile, isSelected, setIsSelected]
  );

  const handleDragLeave = useCallback(() => {
    if (currentFile) {
      setIsSelected(true);
    }
    setIsDragOver(false);
  }, [currentFile, setIsSelected]);

  return {
    isDragOver,
    setIsDragOver,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
