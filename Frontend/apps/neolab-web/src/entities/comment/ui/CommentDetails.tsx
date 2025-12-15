import { getCommentDate } from '@/shared/common/utils/dayjs';
import type { CommentDTO } from '../model/dto/CommentDTO';

export const CommentDetails = ({ comment }: { comment: CommentDTO }) => {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <p className="line-clamp-1 text-sm font-bold">{comment.authorName}</p>
        <p className="text-[12px] font-bold">{getCommentDate(comment.createdAt)}</p>
      </div>
    </div>
  );
};
