import { describe, expect, it } from 'vitest';
import { getRecipientLabel, parseRecipient } from './recipient';

describe('parseRecipient', () => {
  it('принимает номер в любом привычном формате и оставляет только цифры', () => {
    expect(parseRecipient('+375 (29) 123-45-67')).toEqual({ phoneNumber: 375291234567 });
    expect(parseRecipient('79001234567')).toEqual({ phoneNumber: 79001234567 });
    expect(parseRecipient('  +7 900 123 45 67  ')).toEqual({ phoneNumber: 79001234567 });
  });

  it('принимает @username', () => {
    expect(parseRecipient('@ivan_petrov')).toEqual({ username: '@ivan_petrov' });
  });

  it('отклоняет пустую строку, короткий номер, буквы в номере и некорректный username', () => {
    expect(parseRecipient('   ')).toBeNull();
    expect(parseRecipient('12345')).toBeNull();
    expect(parseRecipient('1234567890123456')).toBeNull();
    expect(parseRecipient('+375 29 abc 45 67')).toBeNull();
    expect(parseRecipient('@abc')).toBeNull();
    expect(parseRecipient('@ivan-petrov')).toBeNull();
  });
});

describe('getRecipientLabel', () => {
  it('показывает номер с плюсом, а username как есть', () => {
    expect(getRecipientLabel({ phoneNumber: 375291234567 })).toBe('+375291234567');
    expect(getRecipientLabel({ username: '@ivan_petrov' })).toBe('@ivan_petrov');
  });
});
