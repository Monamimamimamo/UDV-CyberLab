/* eslint-disable @typescript-eslint/no-explicit-any */
import SimpleBar from 'simplebar-react';
import { useEffect, useRef } from 'react';
import { usePageScroll } from './usePageScroll';

export const PageScrollbar = ({ children }: { children: React.ReactNode }) => {
  const simpleBarRef = useRef<any>(null);
  const setScrollElement = usePageScroll(state => state.setScrollElement);

  useEffect(() => {
    if (simpleBarRef.current) {
      setScrollElement(simpleBarRef.current.getScrollElement());
    }
  }, [setScrollElement]);

  return (
    <SimpleBar ref={simpleBarRef} className="max-h-svh" forceVisible="y">
      {children}
    </SimpleBar>
  );
};
