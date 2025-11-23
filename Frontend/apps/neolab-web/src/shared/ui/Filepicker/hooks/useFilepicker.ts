import { useCallback, useRef, useState } from 'react';

type UseFilepickerProps = {
  currentFile: File | null;
  onFileSelect?: (file: File) => void;
};

export const useFilepicker = ({
  currentFile,
  onFileSelect,
}: UseFilepickerProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(Boolean(currentFile));
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (onFileSelect) {
          setIsSelected(true);
          onFileSelect(file);
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [fileInputRef, onFileSelect]
  );

  return {
    fileInputRef,
    handleClick,
    handleFileInput,
    isSelected,
    setIsSelected,
  };
};
