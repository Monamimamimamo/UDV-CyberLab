import { getCommentDate } from '@/shared/common/utils/dayjs';
import type { CommentDTO } from '../model/dto/CommentDTO';

export const CommentDetails = ({ comment }: { comment: CommentDTO }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-bold line-clamp-1">{comment.authorName}</p>
        <p className="text-[12px] font-bold">
          {getCommentDate(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};
