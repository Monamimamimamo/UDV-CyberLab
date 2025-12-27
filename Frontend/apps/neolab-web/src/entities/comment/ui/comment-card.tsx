import { UserImage } from '@/shared/ui';
import { Card } from '@heroui/react';
import type { Comment } from '../model';
import { CommentCardDetails } from './comment-card-details';
import { CommentCardMessage } from './comment-card-message';

type CommentCardProps = {
  comment: Comment;
  actionSlot?: React.ReactNode;
};

export const CommentCard = ({ comment, actionSlot }: CommentCardProps) => {
  return (
    <Card className="drop-shadow-base custom-outline flex min-h-[80px] w-full max-w-full flex-row gap-4 rounded-lg px-[15px] pt-[10px] pb-[20px]">
      <div className="flex-shrink-0">
        <UserImage username={comment.authorName} />
      </div>
      <div className="min-w-0 flex-1">
        <CommentCardDetails comment={comment} />
        <div className="flex w-full flex-row justify-between gap-2">
          <CommentCardMessage comment={comment} />
          <div>{actionSlot}</div>
        </div>
      </div>
    </Card>
  );
};
