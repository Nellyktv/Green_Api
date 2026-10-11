import type { Locale } from '../types';

export const formatTime = (timestamp: number, locale: Locale) =>
  new Date(timestamp).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
