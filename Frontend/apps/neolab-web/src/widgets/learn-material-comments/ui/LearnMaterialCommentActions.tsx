import { type CommentDTO, useDeleteLearnMaterialsComment } from '@/entities/comment';
import { useUser, useUserStatus } from '@/entities/user';
import { CommentActionButton } from '@/features/comment-actions';
import { Divider } from '@heroui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

type LearnMaterialCommentActionsProps = {
  comment: CommentDTO;
  onEdit?: () => void;
  isAdminPage?: boolean;
};

export const LearnMaterialCommentActions = ({
  comment,
  onEdit,
  isAdminPage = false,
}: LearnMaterialCommentActionsProps) => {
  const user = useUser();
  const { isAdmin } = useUserStatus();
  const { mutateAsync: deleteComment, isPending: isDeletePending } = useDeleteLearnMaterialsComment();

  if (isAdminPage) {
    if (!isAdmin) return null;

    return (
      <div>
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
  }

  if (comment.authorName === user?.userName) {
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
  }

  if (isAdmin) {
    return (
      <div>
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
  }

  return null;
};
