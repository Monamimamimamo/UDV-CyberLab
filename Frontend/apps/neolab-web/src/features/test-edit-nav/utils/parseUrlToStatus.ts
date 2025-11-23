import { EditTestNavigation } from '../model/types';

export const parseUrlToStatus = (pathname: string): EditTestNavigation => {
  const status = pathname.split('/').slice(-1)[0] as EditTestNavigation;
  return Object.values(EditTestNavigation).includes(status)
    ? status
    : EditTestNavigation.CUSTOM;
};
