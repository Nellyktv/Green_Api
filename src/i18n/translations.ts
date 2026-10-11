import type { Locale } from '../types';
import { en } from './en';
import { ru, type Translation } from './ru';

type LanguageOption = { id: number; label: string; value: Locale };

export const languages: LanguageOption[] = [
  { id: 1, label: 'RU', value: 'ru' },
  { id: 2, label: 'EN', value: 'en' },
];

export const translations: Record<Locale, Translation> = { ru, en };
