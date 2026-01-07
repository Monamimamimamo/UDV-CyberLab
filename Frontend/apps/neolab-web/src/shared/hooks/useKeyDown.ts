import { type DependencyList, useRef, useEffect } from 'react';

type Keydown = 'Enter' | 'Escape';

export const useKeyDown = (key: Keydown, handler: () => void, deps?: DependencyList): void => {
  const callbackRef = useRef(handler);

  useEffect(() => {
    callbackRef.current = handler;
  }, [handler, deps]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callbackRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key]);
};
