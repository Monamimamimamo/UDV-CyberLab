import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useTestPreview = ({
  testId,
  attemptId,
}: {
  testId: string;
  attemptId: string;
}) => {
  return useSuspenseQuery({
    queryKey: ['test/preview', testId, attemptId],
    queryFn: async () => await testApi.getUserTestPreviewById({id: testId, attemptId}),
  });
};
