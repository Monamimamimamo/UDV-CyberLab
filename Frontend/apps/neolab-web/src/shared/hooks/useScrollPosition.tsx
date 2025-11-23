import { useState, useEffect, useRef, useCallback } from 'react';
import { usePageScroll } from '../ui';

export const useScrollPosition = ({
  threshold,
  isDisabled = false,
}: {
  threshold: number;
  isDisabled?: boolean;
}) => {
  const scrollElement = usePageScroll(state => state.scrollElement);
  const [scrollY, setScrollY] = useState(0);
  const isScrolledRef = useRef(false);
  const scrollElementRef = useRef(scrollElement);

  const handleScroll = useCallback(() => {
    if (!scrollElementRef.current) return;

    const currentScrollTop = scrollElementRef.current.scrollTop || 0;
    const newIsScrolled = currentScrollTop > threshold;

    if (isScrolledRef.current !== newIsScrolled) {
      isScrolledRef.current = newIsScrolled;
      setScrollY(currentScrollTop);
    }
  }, [threshold]);

  useEffect(() => {
    if (isDisabled || !scrollElement) return;

    scrollElementRef.current = scrollElement;

    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll);
    };

    scrollElement.addEventListener('scroll', handleScrollThrottled);
    handleScroll();

    return () => {
      scrollElement.removeEventListener('scroll', handleScrollThrottled);
    };
  }, [scrollElement, isDisabled, handleScroll]);

  return { scrollY, isScrolled: isScrolledRef.current };
};
