import type { Recipient } from '../types';

const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const USERNAME_PATTERN = /^@[a-zA-Z0-9_]{5,32}$/;
const MIN_PHONE_LENGTH = 10;
const MAX_PHONE_LENGTH = 15;

// Получателя можно указать номером в любом привычном виде (+375 (29) 123-45-67)
// или через @username, если человек скрыл в Telegram поиск по номеру
export const parseRecipient = (value: string): Recipient | null => {
  const input = value.trim();

  if (input.startsWith('@')) {
    return USERNAME_PATTERN.test(input) ? { username: input } : null;
  }

  if (!PHONE_PATTERN.test(input)) return null;

  const digits = input.replace(/\D/g, '');
  if (digits.length < MIN_PHONE_LENGTH || digits.length > MAX_PHONE_LENGTH) return null;

  return { phoneNumber: Number(digits) };
};

export const getRecipientLabel = (recipient: Recipient) =>
  'username' in recipient ? recipient.username : `+${recipient.phoneNumber}`;
