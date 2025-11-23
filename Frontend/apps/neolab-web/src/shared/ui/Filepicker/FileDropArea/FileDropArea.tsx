import clsx from 'clsx';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useFilepicker } from '../hooks/useFilepicker';
import { FileDropAreaPreview } from './FileDropAreaPreview';

type ClassnamesType = {
  container?: string;
  title?: string;
  description?: string;
};

type FileDropAreaProps = {
  classNames?: ClassnamesType;
  currentFile: File | null;
  onFileSelect: (file: File) => void;
  withPreview?: boolean;
  filePatterns?: string;
  children?: React.ReactNode;
};

export const FileDropArea = ({
  currentFile,
  onFileSelect,
  classNames,
  withPreview = false,
  filePatterns = 'image/*,.doc,.docx,.pdf',
  children,
}: FileDropAreaProps) => {
  const {
    fileInputRef,
    handleClick,
    handleFileInput,
    isSelected,
    setIsSelected,
  } = useFilepicker({ onFileSelect, currentFile });

  const { isDragOver, handleDrop, handleDragOver, handleDragLeave } =
    useDragAndDrop({
      currentFile,
      isSelected,
      setIsSelected,
      handleFileChange: onFileSelect,
    });

  return (
    <button
      type="button"
      className={clsx(
        'group relative cursor-pointer custom-outline border-second border-2 border-dashed rounded-[20px] duration-200',
        isDragOver
          ? 'border-foreground animate-pulse duration-300'
          : 'border-second',
        classNames?.container
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center">
        {children ? (
          children
        ) : (
          <div className="flex h-full items-center justify-center flex-col">
            <h4 className={clsx('mb-2', classNames?.title)}>Загрузите файл</h4>
            <span
              className={clsx(' text-foreground/70', classNames?.description)}
            >
              {currentFile ? (
                <p className='line-clamp-1'>
                  Файл выбран{' '}
                  <span className="font-bold">{currentFile.name}</span>
                </p>
              ) : (
                <>
                  Перетащите файл или{' '}
                  <span className="font-bold">нажмите загрузить</span>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      <input
        accept={filePatterns}
        tabIndex={-1}
        type="file"
        ref={fileInputRef}
        className="absolute hidden pointer-events-none"
        onChange={handleFileInput}
      />
      {withPreview && currentFile && <FileDropAreaPreview file={currentFile} />}
    </button>
  );
};
