import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../common/utils/scrollToTop';
import { usePageScroll } from '../ui';

export const useNavigation = () => {
  const scroll = usePageScroll(state => state.scrollElement);
  const nav = useNavigate();

  const navigate = useCallback(
    (key: string) => {
      nav(key);
    },
    [nav]
  );

  const lazyNavigate = useCallback(
    (key: string) => {
      setTimeout(() => nav(key), 10);
    },
    [nav]
  );

  const scrollNavigate = useCallback(
    (key: string) => {
      if (scroll && scroll.scrollTop > 0) {
        scrollToTop(scroll).then(() => setTimeout(() => nav(key), 50));
      } else {
        setTimeout(() => nav(key), 10);
      }
    },
    [nav, scroll]
  );

  return { navigate, scrollNavigate, lazyNavigate };
};
