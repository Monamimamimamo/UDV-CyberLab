export const parseAndCreateFile = (
  fileStr: string,
  fileName: string = 'default'
): File => {
  const [header, base64Data] = fileStr.split(';base64,');
  const mimeType = header.split(':')[1];

  const bytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: mimeType });

  return new File([blob], fileName, { type: mimeType });
};

export const createFile = (file: string, mimeType: string): File => {
  const bytes = Uint8Array.from(atob(file), c => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: mimeType });

  return new File([blob], `file-${Date.now()}`, { type: mimeType });
};

export const createFileUrl = (file: string, mimeType: string): string => {
  return `data:${mimeType};base64,${file}`;
};
