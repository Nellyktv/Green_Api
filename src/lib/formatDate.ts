import type { Locale } from '../types';

// Local calendar day, used to compare messages and group them by day
export const getDayKey = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const formatDayLabel = (timestamp: number, locale: Locale) => {
  const now = new Date();
  const day = getDayKey(timestamp);
  const daysAgo = [0, 1].find((n) => day === getDayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - n).getTime()));

  if (daysAgo !== undefined) {
    // "today" / "yesterday" in the current language
    return capitalize(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-daysAgo, 'day'));
  }

  const sameYear = new Date(timestamp).getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(timestamp);
};
