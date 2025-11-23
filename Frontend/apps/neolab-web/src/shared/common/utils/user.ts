export const getImageFallback = (
  username: string
): {
  color: string;
  firstTwoLetters: string;
} => {
  const hash: number = username
    .split('')
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0
    );
  const color = `#${`00000${hash.toString(16)}`.slice(-6)}`;
  const firstTwoLetters = username
    .split('')
    .slice(0, 2)
    .map(letter => letter.toUpperCase())
    .join('');
  return { color, firstTwoLetters };
};
