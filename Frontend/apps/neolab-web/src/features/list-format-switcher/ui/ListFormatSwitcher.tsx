import { Button } from '@/shared/ui';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { useListFormat } from '../model/store';
import { MdTableRows } from 'react-icons/md';
import { Tooltip } from '@heroui/react';

export const ListFormatSwitcher = () => {
  const { setFormat, format } = useListFormat();

  return (
    <Tooltip
      className="rounded-[4px] bg-white"
      showArrow
      content="Формат размещения"
      placement="right"
      closeDelay={100}
    >
      <Button
        type="button"
        fullWidth
        isIconOnly
        color="white"
        size="md"
        radius="sm"
        onPress={() => setFormat(format === 'grid' ? 'rows' : 'grid')}
      >
        {format === 'grid' ? (
          <BsFillGrid3X3GapFill size={22} />
        ) : (
          <MdTableRows size={26} />
        )}
      </Button>
    </Tooltip>
  );
};
