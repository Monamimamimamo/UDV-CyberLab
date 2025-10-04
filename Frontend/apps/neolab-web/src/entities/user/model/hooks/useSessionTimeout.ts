import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';

interface UseSessionTimeoutOptions {
  expirationTime: string | undefined;
  onExpire: () => void;
}

export const useSessionTimeout = ({
  expirationTime,
  onExpire,
}: UseSessionTimeoutOptions) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (expirationTime === undefined) return;

    const expireTime = Date.parse(expirationTime);
    const currentTime = Date.now();
    const timeLeft = expireTime - currentTime;

    if (firstRender.current) {
      firstRender.current = false;
      console.warn(
        `Сессия закончится через: ${dayjs(timeLeft).add(-5, 'hour').format('HH:mm:ss')}.`
      );
    }

    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const timeoutId = setTimeout(() => {
      onExpire();
    }, timeLeft);

    return () => clearTimeout(timeoutId);
  }, [expirationTime, onExpire]);
};
