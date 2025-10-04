const difficultyLabels: { [key: string]: string } = {
  easy: 'Легкая',
  medium: 'Средняя',
  hard: 'Сложная',
  unknown: 'Неизвестная',
};

export const getTestDifficulty = (difficulty: string): string => {
  return difficultyLabels[difficulty.toLowerCase()] ?? difficultyLabels.unknown;
};
