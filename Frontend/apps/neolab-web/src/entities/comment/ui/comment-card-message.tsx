import clsx from 'clsx';
import { useState } from 'react';
import type { Comment } from '../model';
import { IoIosArrowForward } from 'react-icons/io';

type CommentCardMessageProps = {
  comment: Comment;
};

export const CommentCardMessage = ({ comment }: CommentCardMessageProps) => {
  const [isFullView, setIsFullView] = useState(false);
  const isExpanded = comment.text.length > 250;

  return (
    <div className="w-full min-w-0 flex-1">
      <span
        className={clsx('text-sm break-words', isFullView ? 'line-clamp-none' : 'line-clamp-3')}
      >
        {comment.text}
      </span>
      {isExpanded && !isFullView && (
        <div
          onClick={() => setIsFullView(true)}
          className="group mt-1 flex cursor-pointer items-center text-sm font-semibold text-blue-500 transition hover:text-blue-500/80"
        >
          <span>развернуть</span>
          <IoIosArrowForward className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );
};
