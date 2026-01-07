import { useAdminDeleteProjectComment } from '@/entities/admin';
import { type Comment, useDeleteComment } from '@/entities/comment';
import { Divider } from '@heroui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useCommentsContext } from '../model/comments-provider';
import { ActionButton } from '@/features/actions';

type ActionsProps = {
  comment: Comment;
  onEdit?: () => void;
};

type CommentActionsProps = ActionsProps & {
  isOwner: boolean;
};

export const CommentActions = ({ comment, onEdit, isOwner }: CommentActionsProps) => {
  if (isOwner) {
    return <OwnerActions comment={comment} onEdit={onEdit} />;
  }

  return <AdminActions comment={comment} />;
};

const OwnerActions = ({ comment, onEdit }: ActionsProps) => {
  const { entityKey } = useCommentsContext();
  const { deleteComment, isPending } = useDeleteComment(entityKey);

  return (
    <div>
      <ActionButton onPress={onEdit} size="sm" startContent={<MdModeEdit size={17} />}>
        Редактировать
      </ActionButton>
      <Divider className="bg-background my-1" />
      <ActionButton
        size="sm"
        onPress={() => deleteComment(comment.id)}
        disabled={isPending}
        isLoading={isPending}
        startContent={isPending ? null : <MdDelete size={17} />}
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
      >
        Удалить
      </ActionButton>
    </div>
  );
};

const AdminActions = ({ comment }: ActionsProps) => {
  const { deleteProjectComment, isPending } = useAdminDeleteProjectComment();

  return (
    <div>
      <ActionButton
        size="sm"
        onPress={() => deleteProjectComment(comment.id)}
        disabled={isPending}
        isLoading={isPending}
        startContent={isPending ? null : <MdDelete size={17} />}
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
      >
        Удалить
      </ActionButton>
    </div>
  );
};
