import { Comment, type CommentDTO, useProjectComments } from '@/entities/comment';
import { useUser, useUserStatus } from '@/entities/user';
import {
  CommentActions,
  CommentActionsTrigger,
} from '@/features/comment-actions';
import { sortingByDate } from '@/shared/common/utils/sorting';
import { Spinner } from '@/shared/ui';
import { useState } from 'react';
import { CommentEditForm } from './CommentEditForm';

export const ProjectComments = ({ projectId }: { projectId: string }) => {
  const { data: comments, isLoading } = useProjectComments(projectId);

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
        {comments.sort(sortingByDate).map(comment => (
          <li key={comment.id}>
            <CommentWithEdit comment={comment} />
          </li>
        ))}
      </ul>
      {/* TODO */}
      {/* <div className="mt-4 flex justify-center">
        <Button variant="light" size="md" radius="md" className="w-[120px]">
          Загрузить еще
        </Button>
      </div> */}
    </div>
  );
};

const CommentWithEdit = ({ comment }: { comment: CommentDTO }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useUser();
  const { isAdmin } = useUserStatus();

  const hasTools = (author: string) => isAdmin || author === user?.userName;

  return isEditing ? (
    <CommentEditForm comment={comment} onExit={() => setIsEditing(false)} />
  ) : (
    <Comment
      comment={comment}
      actionSlot={
        hasTools(comment.authorName) ? (
          <CommentActionsTrigger>
            <CommentActions
              comment={comment}
              onEdit={() => setIsEditing(true)}
            />
          </CommentActionsTrigger>
        ) : null
      }
    />
  );
};
