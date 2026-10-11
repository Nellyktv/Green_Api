import type { Locale } from '../types';
import { en } from './en';
import { ru, type Translation } from './ru';

type LanguageOption = { label: string; value: Locale };

export const languages: LanguageOption[] = [
  { label: 'RU', value: 'ru' },
  { label: 'EN', value: 'en' },
];

export const translations: Record<Locale, Translation> = { ru, en };
