import { CommentCard, type Comment } from '@/entities/comment';
import { useUser, useUserStatus } from '@/entities/user';
import { useMemo, useState } from 'react';
import { useCommentsContext } from '../model/comments-provider';
import { CommentEditForm } from './comment-edit-form';
import { ActionsTrigger } from '@/features/actions';
import { CommentActions } from './comment-actions';

type CommentProps = {
  comment: Comment;
};

export const CommentCardWithEdit = ({ comment }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { isAdminPage } = useCommentsContext();
  const user = useUser();
  const { isAdmin } = useUserStatus();

  const isOwner = useMemo(
    () => comment.authorName === user?.userName,
    [comment.authorName, user?.userName],
  );

  const hasTools = useMemo(() => {
    return isAdminPage ? isAdmin : isAdmin || isOwner;
  }, [isAdminPage, isAdmin, isOwner]);

  return isEditing ? (
    <CommentEditForm comment={comment} onExit={() => setIsEditing(false)} />
  ) : (
    <CommentCard
      comment={comment}
      actionSlot={
        hasTools ? (
          <ActionsTrigger>
            {(close) => (
              <CommentActions
                comment={comment}
                isOwner={isOwner}
                onEdit={() => {
                  close();
                  setIsEditing(true);
                }}
              />
            )}
          </ActionsTrigger>
        ) : null
      }
    />
  );
};
