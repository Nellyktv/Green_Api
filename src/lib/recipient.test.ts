import { describe, expect, it } from 'vitest';
import { getRecipientLabel, parseRecipient } from './recipient';

describe('parseRecipient', () => {
  it('accepts a number in any common format and keeps only digits', () => {
    expect(parseRecipient('+375 (29) 123-45-67')).toEqual({ phoneNumber: 375291234567 });
    expect(parseRecipient('79001234567')).toEqual({ phoneNumber: 79001234567 });
    expect(parseRecipient('  +7 900 123 45 67  ')).toEqual({ phoneNumber: 79001234567 });
  });

  it('accepts @username', () => {
    expect(parseRecipient('@ivan_petrov')).toEqual({ username: '@ivan_petrov' });
  });

  it('accepts phone numbers but rejects @username for WhatsApp', () => {
    expect(parseRecipient('+375 29 123-45-67', 'whatsapp')).toEqual({ phoneNumber: 375291234567 });
    expect(parseRecipient('@ivan_petrov', 'whatsapp')).toBeNull();
  });

  it('rejects an empty string, a short number, letters in a number and an invalid username', () => {
    expect(parseRecipient('   ')).toBeNull();
    expect(parseRecipient('12345')).toBeNull();
    expect(parseRecipient('1234567890123456')).toBeNull();
    expect(parseRecipient('+375 29 abc 45 67')).toBeNull();
    expect(parseRecipient('@abc')).toBeNull();
    expect(parseRecipient('@ivan-petrov')).toBeNull();
  });
});

describe('getRecipientLabel', () => {
  it('shows a number with a plus and a username as is', () => {
    expect(getRecipientLabel({ phoneNumber: 375291234567 })).toBe('+375291234567');
    expect(getRecipientLabel({ username: '@ivan_petrov' })).toBe('@ivan_petrov');
  });
});
