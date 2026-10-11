import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDayLabel, getDayKey } from './formatDate';

describe('formatDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 5, 15, 12, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('gives the same key within one local day and different keys across midnight', () => {
    expect(getDayKey(new Date(2026, 5, 15, 0, 0, 1).getTime())).toBe(getDayKey(new Date(2026, 5, 15, 23, 59, 59).getTime()));
    expect(getDayKey(new Date(2026, 5, 15, 23, 59, 59).getTime())).not.toBe(getDayKey(new Date(2026, 5, 16, 0, 0, 0).getTime()));
  });

  it('labels the current day as today', () => {
    expect(formatDayLabel(new Date(2026, 5, 15, 8, 0).getTime(), 'en')).toBe('Today');
  });

  it('labels the previous day as yesterday, also across a month boundary', () => {
    expect(formatDayLabel(new Date(2026, 5, 14, 23, 0).getTime(), 'en')).toBe('Yesterday');
    vi.setSystemTime(new Date(2026, 6, 1, 10, 0));
    expect(formatDayLabel(new Date(2026, 5, 30, 10, 0).getTime(), 'en')).toBe('Yesterday');
  });

  it('formats older days of the current year without the year', () => {
    expect(formatDayLabel(new Date(2026, 2, 3).getTime(), 'en')).toBe('March 3');
  });

  it('labels today and yesterday in the current language', () => {
    expect(formatDayLabel(new Date(2026, 5, 15, 8, 0).getTime(), 'ru')).toBe('Сегодня');
    expect(formatDayLabel(new Date(2026, 5, 14, 8, 0).getTime(), 'ru')).toBe('Вчера');
  });

  it('adds the year for days from other years', () => {
    expect(formatDayLabel(new Date(2025, 11, 31).getTime(), 'en')).toBe('December 31, 2025');
  });
});
