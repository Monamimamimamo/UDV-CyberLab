import { EditTestSwitcher } from './ui/EditTestSwitcher';
import { FileDropArea } from '@/shared/ui/Filepicker/FileDropArea/FileDropArea';
import { useState } from 'react';

const EditAIPage = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <section className="flex flex-col gap-[12px]">
      {/* <TestTitleEdit /> */}
      <FileDropArea currentFile={file} onFileSelect={setFile} />
      <EditTestSwitcher />
    </section>
  );
};

export default EditAIPage;
