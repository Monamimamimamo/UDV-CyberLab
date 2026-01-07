import React, { createContext, useContext, useMemo } from 'react';
import type { CommentEntity } from '@/entities/comment';

type CommentsContextType = CommentEntity & {
  isAdminPage?: boolean;
};

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

interface CommentsProviderProps extends CommentsContextType {
  children: React.ReactNode;
}

export const CommentsProvider = ({
  entityId,
  entityKey,
  isAdminPage,
  children,
}: CommentsProviderProps) => {
  const value = useMemo(
    () => ({
      entityId,
      entityKey,
      isAdminPage,
    }),
    [entityId, entityKey, isAdminPage],
  );

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error('useCommentsContext must be used within CommentsProvider');
  }

  return context;
};
