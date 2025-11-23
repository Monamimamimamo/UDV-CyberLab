import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getDurationObject = (duration: string) => {
  const [hours, minutes, seconds = '0'] = duration.split(':').map(Number);
  return {
    hours: Number(hours),
    minutes: Number(minutes),
    seconds: Number(seconds),
  };
};

const parseDurationTime = (duration: string | number) => {
  let d = dayjs.duration(0);

  if (typeof duration === 'string') {
    if (duration.startsWith('PT')) {
      d = dayjs.duration(duration);
    } else if (duration.includes('T')) {
      const timePart = duration.split('T')[1];
      d = dayjs.duration(getDurationObject(timePart));
    } else if (duration.includes(':')) {
      d = dayjs.duration(getDurationObject(duration));
    }
  } else if (typeof duration === 'number') {
    d = dayjs.duration(duration);
  }

  return d;
};

export const getDurationFormat = (duration: string | number, regex: string) => {
  return parseDurationTime(duration).format(regex);
};

export const getDateFormat = (date: string, regex: string) =>
  dayjs(date).format(regex);

export const getCommentDate = (date: string) =>
  getDateFormat(
    date,
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString()
      ? 'Сегодня в HH:mm'
      : 'DD.MM.YYYY в HH:mm '
  );
