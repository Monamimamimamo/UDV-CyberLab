import { useMediaQuery } from '@/shared/hooks';
import { StickyElement } from '@/shared/ui';

type LayoutWithSidebarProps = {
  sidebarSlot: React.ReactNode;
  children: React.ReactNode;
};

export const LayoutWithSidebar = ({
  sidebarSlot,
  children,
}: LayoutWithSidebarProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  return (
    <main className="min-h-[calc(100vh-80px)]">
      <div className="flex flex-row lg:justify-start justify-center gap-[20px] mt-[12px] min-h-[calc(100vh-200px)]">
        {isDesktop && (
          <StickyElement className="top-[75px] h-[200px]">
            {sidebarSlot}
          </StickyElement>
        )}
        {children}
      </div>
    </main>
  );
};
