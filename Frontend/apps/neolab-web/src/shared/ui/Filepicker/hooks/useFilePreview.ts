import { useEffect, useState } from 'react';
import { downloadFile } from '../utils';

export const useFilePreview = (file: File) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloadDone, setIsDownloadDone] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setFileUrl(null);
      };
    }
  }, [file]);

  const handleDownloadClick = () => {
    if (fileUrl && file) {
      downloadFile({ file, fileUrl });
      setIsDownloadDone(true);
      setTimeout(() => {
        setIsDownloadDone(false);
      }, 4000);
    }
  };

  return {
    fileUrl,
    isOpen,
    isDownloadDone,
    setIsOpen,
    handleDownloadClick,
  };
};
