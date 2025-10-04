const subjectLabels: { [key: string]: string } = {
  english: 'Английский язык',
  math: 'Математика',
  physics: 'Физика',
  russian: 'Русский язык',
  chemistry: 'Химия',
  biology: 'Биология',
  geography: 'География',
  informatics: 'Информатика',
  history: 'История',
  literature: 'Литература',
  astronomy: 'Астрономия',
  ecology: 'Экология',
  'social studies': 'Обществознание',
  programming: 'Программирование',
  art: 'Искусство',
  music: 'Музыка',
  'physical education': 'Физкультура',
  philosophy: 'Философия',
  unknown: 'Неизвестная',
};

export const getTestSubject = (subject: string): string => {
  return subjectLabels[subject.toLowerCase()] ?? subjectLabels.unknown;
};

