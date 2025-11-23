export const getPercentage = (points: number, totalPoints: number) => {
  return Math.round((points / totalPoints) * 100);
};

const REDIRECT_PATH = 'redirect_path';

export const getRedirectPath = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get(REDIRECT_PATH) || '/';
  return redirectPath;
};
