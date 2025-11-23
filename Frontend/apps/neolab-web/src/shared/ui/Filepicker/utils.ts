import {
  BiSolidFileBlank,
  BiSolidFileDoc,
  BiSolidFileGif,
  BiSolidFileImage,
  BiSolidFileJson,
  BiSolidFileTxt,
  BiSolidFilePdf,
  BiSolidFileArchive,
} from 'react-icons/bi';

export const getFileIcon = (fileType: string) =>
  ({
    'application/pdf': BiSolidFilePdf,
    'image/gif': BiSolidFileGif,
    'image/jpeg': BiSolidFileImage,
    'image/png': BiSolidFileImage,
    'image/svg+xml': BiSolidFileImage,
    'application/json': BiSolidFileJson,
    'text/plain': BiSolidFileTxt,
    'application/msword': BiSolidFileDoc,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      BiSolidFileDoc,
    'application/zip': BiSolidFileArchive,
    'application/x-rar-compressed': BiSolidFileArchive,
  })[fileType] || BiSolidFileBlank;

export const isImage = (type: string) =>
  ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'].includes(type);

export const downloadFile = ({
  file,
  fileUrl,
}: {
  file: File;
  fileUrl: string;
}) => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
