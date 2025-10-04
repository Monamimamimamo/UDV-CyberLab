import { useMediaQuery } from '@/shared/hooks';
import { HeaderDesktop } from './desktop/HeaderDesktop';
import { HeaderMobile } from './mobile/HeaderMobile';
import { useProfile } from '@/entities/user';

export const Header = () => {
  useProfile();
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  return isTablet ? <HeaderMobile /> : <HeaderDesktop />;
};
