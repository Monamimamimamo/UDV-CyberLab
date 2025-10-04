import { FilePreview } from './FilePreview';
import { FilepickerButton } from './FilepickerButton';
import { useFilepicker } from '../hooks';

type FilepickerProps = {
  currentFile: File | null;
  onFileSelect?: (file: File) => void;
  withPreview?: boolean;
};

export const Filepicker = ({
  onFileSelect,
  currentFile,
  withPreview = true,
}: FilepickerProps) => {
  const {
    fileInputRef,
    handleClick,
    handleFileInput,
    isSelected,
    setIsSelected,
  } = useFilepicker({ onFileSelect, currentFile });

  return (
    <div className="flex sm:flex-row flex-col sm:items-center gap-2">
      <FilepickerButton
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        currentFile={currentFile}
        handleFileChange={onFileSelect}
        handleClick={handleClick}
      />
      {onFileSelect && (
        <input
          tabIndex={-1}
          ref={fileInputRef}
          type="file"
          onChange={handleFileInput}
          className="hidden"
        />
      )}
      {withPreview && currentFile && <FilePreview currentFile={currentFile} />}
    </div>
  );
};
