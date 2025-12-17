import { Comment, type CommentDTO, useLearnMaterialsComments } from '@/entities/comment';
import { useUser, useUserStatus } from '@/entities/user';
import { CommentActionsTrigger } from '@/features/comment-actions';
import { sortingByDate } from '@/shared/common/utils/sorting';
import { Spinner } from '@/shared/ui';
import { useState } from 'react';
import { LearnMaterialCommentActions } from './LearnMaterialCommentActions';
import { LearnMaterialCommentEditForm } from './LearnMaterialCommentEditForm';

type LearnMaterialCommentsProps = {
  materialId: string;
  isAdminPage?: boolean;
};

export const LearnMaterialComments = ({ materialId, isAdminPage = false }: LearnMaterialCommentsProps) => {
  const { data: comments, isLoading } = useLearnMaterialsComments(materialId);

  if (!comments || isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Spinner color="primary" size="lg" />
      </div>
    );

  return (
    <div className="w-full max-w-full">
      <p className="mb-1">Всего комментариев {comments.length ?? 0}</p>
      <ul className="flex flex-col gap-2 w-full">
        {comments.sort(sortingByDate).map((comment) => (
          <li key={comment.id}>
            <CommentWithEdit comment={comment} isAdminPage={isAdminPage} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommentWithEdit = ({ comment, isAdminPage }: { comment: CommentDTO; isAdminPage: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const { isAdmin } = useUserStatus();

  const hasTools = isAdminPage ? isAdmin : isAdmin || comment.authorName === user?.userName;

  return isEditing ? (
    <LearnMaterialCommentEditForm comment={comment} onExit={() => setIsEditing(false)} />
  ) : (
    <Comment
      comment={comment}
      actionSlot={
        hasTools ? (
          <CommentActionsTrigger>
            <LearnMaterialCommentActions
              comment={comment}
              onEdit={() => setIsEditing(true)}
              isAdminPage={isAdminPage}
            />
          </CommentActionsTrigger>
        ) : null
      }
    />
  );
};
