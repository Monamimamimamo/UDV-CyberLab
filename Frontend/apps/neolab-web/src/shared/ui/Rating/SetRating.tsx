import clsx from 'clsx';
import { useState } from 'react';
import { IoIosStar } from 'react-icons/io';

export const SetRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex mb-4">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        const isActive = ratingValue <= rating;
        const isHovered = ratingValue <= hover;
        const isReducing = hover > 0 && hover < rating;
        const willBeRemoved =
          isReducing && ratingValue > hover && ratingValue <= rating;

        return (
          <button
            type="button"
            key={index}
            className="text-5xl bg-transparent border-none outline-none cursor-pointer"
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <span
              className={clsx('transition-colors duration-200', {
                'text-yellow-500':
                  (isActive && !isReducing) ||
                  (isActive && isReducing && ratingValue <= hover),
                'text-yellow-500/40':
                  (!isActive && isHovered && hover > rating) || willBeRemoved,
                'text-foreground/20': !isActive && !isHovered && !willBeRemoved,
              })}
            >
              <IoIosStar />
            </span>
          </button>
        );
      })}
    </div>
  );
};
