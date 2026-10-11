import type { Locale } from '../types';

// Building an Intl formatter is slow, so keep one per language
const formatters = new Map<Locale, Intl.DateTimeFormat>();

export const formatTime = (timestamp: number, locale: Locale) => {
  let formatter = formatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' });
    formatters.set(locale, formatter);
  }
  return formatter.format(timestamp);
};
