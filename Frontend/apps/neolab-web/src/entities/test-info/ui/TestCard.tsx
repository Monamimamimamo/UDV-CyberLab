import { NeolabTestIcon } from '@/shared/assets/svgs';
import type { ITestCard } from '../model/types/ITestCard';

type TestCardProps = {
  test: ITestCard;
  onClick?: () => void;
  rightContent?: React.ReactNode;
};

export const TestCard = ({ test, onClick, rightContent }: TestCardProps) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      onClick?.();
    }
  };

  return (
    <li
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="custom-outline drop-shadow-base h-[64px] cursor-pointer rounded-[10px] bg-white duration-200 hover:bg-white/65"
    >
      <div className="flex h-full flex-row items-center justify-between px-4 py-3">
        <div className="flex flex-row items-center justify-start gap-[10px]">
          <NeolabTestIcon className="text-[30px]" />
          <p className="line-clamp-1 w-[calc(100%-50px)] text-[15px] sm:text-[16px]">
            {test.title}
          </p>
        </div>
        <div>{rightContent}</div>
      </div>
    </li>
  );
};
