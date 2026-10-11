import type { Locale } from '../types';

// Local calendar day, used to compare messages and group them by day
export const getDayKey = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const formatDayLabel = (
  timestamp: number,
  locale: Locale,
  labels: { today: string; yesterday: string },
) => {
  const now = new Date();
  if (getDayKey(timestamp) === getDayKey(now.getTime())) return labels.today;

  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (getDayKey(timestamp) === getDayKey(yesterday.getTime())) return labels.yesterday;

  const sameYear = new Date(timestamp).getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(timestamp);
};
