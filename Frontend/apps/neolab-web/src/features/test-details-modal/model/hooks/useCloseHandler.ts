import { useTestDetailsModalStore } from '../store';

export const useModalCloseHandler = () => {
  const setOpen = useTestDetailsModalStore(state => state.setOpen);

  const closeHandler = (callback: () => void) => {
    return () => {
      setOpen(false);
      setTimeout(callback, 200);
    };
  };

  return closeHandler;
};
