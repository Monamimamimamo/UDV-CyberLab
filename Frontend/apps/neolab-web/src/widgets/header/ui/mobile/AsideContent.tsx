import { Accordion, AccordionItem } from '@heroui/react';
import { mobileNav } from '../../const/mobileNav';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Scrollbar } from '@/shared/ui';
import { useUserStatus } from '@/entities/user';

type AsideContentProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export const AsideContent = ({ setIsOpen }: AsideContentProps) => {
  const { isAdmin } = useUserStatus();
  const navigate = useNavigate();

  const closeHandler = useCallback(
    (path: string) => {
      return () => {
        setIsOpen(false);
        navigate(path);
      };
    },
    [navigate, setIsOpen]
  );

  return (
    <div className="overflow-hidden">
      <Scrollbar className="max-h-full">
        <Accordion
          showDivider={false}
          selectionMode="multiple"
          className="flex flex-col gap-2 py-2"
        >
          {mobileNav
            .filter(item => !item.adminOnly || isAdmin)
            .map(item => (
              <AccordionItem
                key={item.label}
                aria-label={item.label}
                classNames={{
                  title: 'font-semibold',
                  trigger:
                    'active:bg-second/10 px-5 py-2 rounded-md duration-200',
                  indicator: 'text-foreground text-xl',
                  content: 'py-0 pl-8 flex flex-col',
                }}
                title={item.label}
              >
                {item.links.map((link, index) => (
                  <button
                    onClick={closeHandler(link.path)}
                    key={index}
                    className="active:bg-second/10 text-start font-light w-full px-5 py-2 rounded-md duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </AccordionItem>
            ))}
        </Accordion>
      </Scrollbar>
    </div>
  );
};
