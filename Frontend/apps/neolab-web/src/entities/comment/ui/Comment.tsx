import { UserImage } from '@/shared/ui';
import { Card } from '@heroui/react';
import clsx from 'clsx';
import { useState } from 'react';
import type { CommentDTO } from '../model/dto/CommentDTO';
import { CommentDetails } from './CommentDetails';

type CommentType = {
  comment: CommentDTO;
  actionSlot?: React.ReactNode;
};

export const Comment = ({ comment, actionSlot }: CommentType) => {
  const [isFullView, setIsFullView] = useState(false);
  const isExpanded = comment.text.length > 250;

  return (
    <Card className="drop-shadow-base max-w-full w-full rounded-lg custom-outline pt-[10px] pb-[20px] px-[15px] flex flex-row gap-4 min-h-[80px]">
      <div className="flex-shrink-0">
        <UserImage username={comment.authorName} />
      </div>
      <div className="flex-1 min-w-0">
        <CommentDetails comment={comment} />
        <div className="w-full flex flex-row gap-2 justify-between">
          <div className="w-full flex-1 min-w-0">
            <span
              className={clsx(
                'text-sm break-words',
                isFullView ? 'line-clamp-none' : 'line-clamp-3'
              )}
            >
              {comment.text}
            </span>
            {isExpanded && !isFullView && (
              <span
                onClick={() => setIsFullView(true)}
                className="text-foreground/80 hover:underline text-sm font-semibold cursor-pointer"
              >
                развернуть
              </span>
            )}
          </div>
          <div>{actionSlot}</div>
        </div>
      </div>
    </Card>
  );
};
