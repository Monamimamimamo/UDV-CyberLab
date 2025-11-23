export const scrollToTop = (scroll: HTMLElement): Promise<void> => {
  return new Promise(resolve => {
    const handleScroll = () => {
      if (scroll?.scrollTop === 0) {
        scroll?.removeEventListener('scroll', handleScroll);
        resolve();
      }
    };

    scroll?.addEventListener('scroll', handleScroll);
    scroll?.scrollTo({ top: 0, behavior: 'smooth' });

    if (scroll?.scrollTop === 0) {
      scroll?.removeEventListener('scroll', handleScroll);
      resolve();
    }
  });
};
