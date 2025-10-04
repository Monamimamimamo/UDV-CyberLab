import { useEffect, useRef } from 'react';

export const useScrollContainer = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleWheelScroll = (e: WheelEvent) => {
      if (container) {
        e.preventDefault();
        container.scrollLeft -= e.deltaY * 2;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheelScroll, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheelScroll);
      }
    };
  }, []);

  return scrollContainerRef;
};
