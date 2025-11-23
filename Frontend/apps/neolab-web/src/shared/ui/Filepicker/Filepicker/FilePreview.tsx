import { MdFileDownload, MdFileDownloadDone } from 'react-icons/md';
import { Button } from '../../Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from '@heroui/react';
import { getFileIcon, isImage } from '../utils';
import { useFilePreview } from '../hooks';

export const FilePreview = ({ currentFile }: { currentFile: File }) => {
  const { isOpen, setIsOpen, fileUrl, isDownloadDone, handleDownloadClick } =
    useFilePreview(currentFile);

  const FileIcon = getFileIcon(currentFile.type);

  return isImage(currentFile.type) ? (
    <Popover
      isOpen={isOpen}
      onOpenChange={open => setIsOpen(open)}
      classNames={{
        content: 'p-0',
      }}
      placement="bottom-end"
      offset={20}
      showArrow
    >
      <PopoverTrigger>
        <span>
          <Tooltip
            className="rounded-[4px] bg-white"
            showArrow
            content="Превью файла"
            placement="right"
          >
            <Button
              onPress={() => setIsOpen(true)}
              radius="sm"
              color="primary"
              isIconOnly
            >
              <FileIcon size={34} />
            </Button>
          </Tooltip>
        </span>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden">
        <div className="group relative ">
          <div className="w-full h-full">
            <img
              src={fileUrl ?? ''}
              alt="Preview"
              className="h-full w-full object-cover max-h-[300px] max-w-[300px]"
            />
          </div>
          <Tooltip
            className="rounded-[4px] bg-white"
            showArrow
            content="Скачать файл"
            placement="bottom-end"
          >
            <Button
              isDisabled={isDownloadDone}
              className="absolute right-1 bottom-1"
              radius="sm"
              size="sm"
              isIconOnly
              onPress={handleDownloadClick}
            >
              {isDownloadDone ? (
                <MdFileDownloadDone size={25} />
              ) : (
                <MdFileDownload size={25} />
              )}
            </Button>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <Tooltip
      className="rounded-[4px] bg-white"
      showArrow
      content="Скачать файл"
      placement="right"
    >
      <Button
        isDisabled={isDownloadDone}
        radius="sm"
        color="primary"
        isIconOnly
        onPress={handleDownloadClick}
      >
        <FileIcon size={34} />
      </Button>
    </Tooltip>
  );
};
