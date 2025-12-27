import { Divider } from '@heroui/react';
import { CommentActionButton } from './CommentActionButton';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { type CommentDTO, useDeleteProjectComment } from '@/entities/comment';
import { useAdminDeleteProjectComment } from '@/entities/admin';
import { useUser } from '@/entities/user';

type CommentActionsProps = {
  comment: CommentDTO;
  onEdit?: () => void;
};

export const CommentActions = ({ comment, onEdit }: CommentActionsProps) => {
  const user = useUser();

  if (comment.authorName === user?.userName)
    return <OwnerActions comment={comment} onEdit={onEdit} />;

  return <AdminActions comment={comment} />;
};

const OwnerActions = ({ comment, onEdit }: CommentActionsProps) => {
  const { mutateAsync: deleteComment, isPending: isDeletePending } = useDeleteProjectComment();

  return (
    <div>
      <CommentActionButton onPress={onEdit} size="sm" startContent={<MdModeEdit size={17} />}>
        Редактировать
      </CommentActionButton>
      <Divider className="bg-background my-1" />
      <CommentActionButton
        size="sm"
        onPress={() => deleteComment(comment.id)}
        isDisabled={isDeletePending}
        startContent={<MdDelete size={17} />}
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
      >
        Удалить
      </CommentActionButton>
    </div>
  );
};

const AdminActions = ({ comment }: CommentActionsProps) => {
  const { deleteProjectComment, isPending } = useAdminDeleteProjectComment();

  return (
    <div>
      <CommentActionButton
        size="sm"
        onPress={() => deleteProjectComment(comment.id)}
        isDisabled={isPending}
        startContent={<MdDelete size={17} />}
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
      >
        Удалить
      </CommentActionButton>
    </div>
  );
};
