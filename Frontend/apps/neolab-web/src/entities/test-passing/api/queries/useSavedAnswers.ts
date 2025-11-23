import { useSuspenseQuery } from '@tanstack/react-query';
import { testPassingApi } from '../services/testPassingAPI';
import { useEffect } from 'react';
import { useAnswers } from '../../model/store';

export const useSavedAnswers = (id: string) => {
  const saveAnswers = useAnswers(state => state.saveAnswers);
  const { data } = useSuspenseQuery({
    queryKey: ['test/savedAnswers', id],
    queryFn: async () => await testPassingApi.getSavedAnswers(id),
  });

  useEffect(() => {
    if (data) {
      saveAnswers(data);
    }
  }, [saveAnswers, data]);

  return { data };
};
