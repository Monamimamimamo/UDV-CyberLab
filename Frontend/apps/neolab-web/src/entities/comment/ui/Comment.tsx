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
    <Card className="drop-shadow-base custom-outline flex min-h-[80px] w-full max-w-full flex-row gap-4 rounded-lg px-[15px] pt-[10px] pb-[20px]">
      <div className="flex-shrink-0">
        <UserImage username={comment.authorName} />
      </div>
      <div className="min-w-0 flex-1">
        <CommentDetails comment={comment} />
        <div className="flex w-full flex-row justify-between gap-2">
          <div className="w-full min-w-0 flex-1">
            <span
              className={clsx(
                'text-sm break-words',
                isFullView ? 'line-clamp-none' : 'line-clamp-3',
              )}
            >
              {comment.text}
            </span>
            {isExpanded && !isFullView && (
              <span
                onClick={() => setIsFullView(true)}
                className="text-foreground/80 cursor-pointer text-sm font-semibold hover:underline"
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
