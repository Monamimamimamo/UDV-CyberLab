import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';
import type { CreateTestDTO } from '../../model/dto';
import dayjs from 'dayjs';

const createTestMock: CreateTestDTO = {
  name: 'Новый тест',
  description: '',
  theme: '',
  difficulty: '',
  attemptsCount: 1,
  startTestTime: dayjs().toISOString(),
  endTestTime: dayjs().add(1, 'month').toISOString(),
  passTestTime: '10:00:00',
  maxPoints: 0,
};

export const useCreateTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test/create'],
    mutationFn: async () => await testApi.createTest(createTestMock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
};
