import { EditTestNavigation } from '../model/types';

export const convertEditTestTypeToString = (
  type: EditTestNavigation
): string => {
  switch (type) {
  case EditTestNavigation.GENERATE:
    return 'generate';
  case EditTestNavigation.AI_GENERATION:
    return 'ai';
  default:
    return 'custom';
  }
};
