import { getCommentDate } from '@/shared/common/utils/dayjs';
import type { Comment } from '../model';

type CommentCardDetailsProps = { comment: Comment };

export const CommentCardDetails = ({ comment }: CommentCardDetailsProps) => {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <p className="line-clamp-1 text-sm font-bold">{comment.authorName}</p>
        <p className="text-[12px] font-bold">{getCommentDate(comment.createdAt)}</p>
      </div>
    </div>
  );
};
