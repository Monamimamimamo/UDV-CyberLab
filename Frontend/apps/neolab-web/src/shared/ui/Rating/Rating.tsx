import { Tooltip } from '@heroui/react';
import { IoIosStar } from 'react-icons/io';

type RatingProps = {
  rating: number;
  starSize?: number;
};

export const Rating = ({ rating, starSize = 18 }: RatingProps) => {
  const clampedRating = Math.min(rating, 5);

  return (
    <Tooltip
      showArrow
      content={`Рейтинг: ${Number(rating).toFixed(2)}`}
      placement="bottom"
      radius="sm"
      closeDelay={0}
      offset={2}
      size="sm"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {Array.from({ length: 5 }, (_, index) => {
          const integerPart = Math.floor(clampedRating);
          const decimalPart = clampedRating - integerPart;
          let fillPercentage = 0;

          if (index < integerPart) {
            fillPercentage = 100;
          } else if (index === integerPart) {
            fillPercentage = Math.round(decimalPart * 100);
          }

          return (
            <div key={index} className="relative">
              <IoIosStar size={starSize} className="text-foreground/20" />

              <div
                className="absolute top-0 left-0 overflow-hidden h-full pointer-events-none"
                style={{
                  width: `${fillPercentage}%`,
                }}
              >
                <IoIosStar size={starSize} className="text-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </Tooltip>
  );
};
