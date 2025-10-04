import { EditTestNavigation } from '../model/types';

export const getEditStatusUrl = (
  testId: string,
  editType: EditTestNavigation
) => {
  switch (editType) {
  case EditTestNavigation.GENERATE:
    return `/tests/manage/${testId}/edit/generate`;
  case EditTestNavigation.AI_GENERATION:
    return `/tests/manage/${testId}/edit/ai`;
  default:
    return `/tests/manage/${testId}/edit/custom`;
  }
};
