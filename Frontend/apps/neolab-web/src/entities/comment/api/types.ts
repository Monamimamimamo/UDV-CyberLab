import type { commentServices } from './services';

export type CommentKeys = keyof typeof commentServices;

export type CommentEntity = {
  entityId: string;
  entityKey: CommentKeys;
};
