import { useSuspenseQuery } from '@tanstack/react-query';
import { testPassingApi } from '../services/testPassingAPI';
import { useEffect } from 'react';
import { useAnswers } from '../../model/store';

export const usePassingTest = (id: string, attemptId: string) => {
  const setQuestions = useAnswers(state => state.setQuestions);
  const { data, isFetching } = useSuspenseQuery({
    queryKey: ['test/passing', id],
    queryFn: async () =>
      await testPassingApi.getPassingTestById({ id, attemptId }),
  });

  useEffect(() => {
    if (data) {
      setQuestions(data.questions, data.totalQuestions);
    }
  }, [data, setQuestions]);

  return { data, isFetching };
};
