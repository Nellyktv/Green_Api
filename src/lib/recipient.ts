import type { Recipient } from '../types';

const PHONE_PATTERN = /^\+?[\d\s()-]+$/;
const USERNAME_PATTERN = /^@[a-zA-Z0-9_]{5,32}$/;
const MIN_PHONE_LENGTH = 10;
const MAX_PHONE_LENGTH = 15;

// The recipient can be a phone number in any common format (+375 (29) 123-45-67)
// or a @username, if the person has hidden number search in Telegram
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
