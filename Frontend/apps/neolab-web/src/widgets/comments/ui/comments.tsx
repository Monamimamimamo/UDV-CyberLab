import { useComments, type CommentEntity } from '@/entities/comment';
import { sortingByDate } from '@/shared/common/utils/sorting';
import { Spinner } from '@/shared/ui';
import { CommentsProvider } from '../model/comments-provider';
import { CommentCardWithEdit } from './comment-card-with-edit';

type CommentsProps = CommentEntity & {
  isAdminPage?: boolean;
};

export const Comments = ({ entityId, entityKey, isAdminPage = false }: CommentsProps) => {
  const { comments, isLoading } = useComments(entityKey, entityId);

  if (!comments || isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );

  return (
    <CommentsProvider entityId={entityId} entityKey={entityKey} isAdminPage={isAdminPage}>
      <div className="w-full max-w-full">
        <p className="mb-1">Всего комментариев {comments.length}</p>
        <ul className="flex w-full flex-col gap-2">
          {comments.sort(sortingByDate).map((comment) => (
            <li key={comment.id}>
              <CommentCardWithEdit comment={comment} />
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
    </CommentsProvider>
  );
};
