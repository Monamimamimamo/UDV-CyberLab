import { Image } from '@heroui/react';
import { useEffect, useState } from 'react';

export const FileDropAreaPreview = ({ file }: { file: File }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

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

  return (
    <Image
      isBlurred={true}
      src={fileUrl ?? ''}
      className="h-full w-full rounded-2xl object-cover object-center"
      classNames={{
        wrapper: 'absolute inset-1 bg-white !max-w-full',
      }}
    />
  );
};
