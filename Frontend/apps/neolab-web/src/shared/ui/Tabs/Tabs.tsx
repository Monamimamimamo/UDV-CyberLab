import {
  extendVariants,
  Tabs as TabsNextUI,
  type TabsProps,
  Tab,
} from '@heroui/react';

export const Tabs = extendVariants(TabsNextUI, {
  variants: {
    color: {
      default: {
        cursor: 'bg-gradient-to-r from-foreground to-second !hover:bg-black',
        tabContent: 'group-data-[selected=true]:text-white text-foreground',
        tabList: 'bg-white',
      },
      secondary: {
        cursor: 'bg-white text-foreground',
        tabContent:
          'text-foreground group-data-[selected=true]:text-foreground',
        tabList: 'bg-secondary',
      },
    },
    variant: {
      bordered: {
        tabList: 'border-gray',
      },
    },
    size: {
      lg: {
        tab: 'py-[22px]',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    radius: 'sm',
  },
});

export type { TabsProps };
export { Tab };
