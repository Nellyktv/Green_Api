import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore theme mode', () => {
  beforeEach(() => {
    useAppStore.setState({ themeMode: 'light' });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('toggleThemeMode switches between light and dark and saves the choice', () => {
    useAppStore.getState().toggleThemeMode();
    expect(useAppStore.getState().themeMode).toBe('dark');
    expect(JSON.parse(localStorage.getItem('themeMode') ?? 'null')).toBe('dark');

    useAppStore.getState().toggleThemeMode();
    expect(useAppStore.getState().themeMode).toBe('light');
    expect(JSON.parse(localStorage.getItem('themeMode') ?? 'null')).toBe('light');
  });

  it('restores the saved theme after a page reload', async () => {
    localStorage.setItem('themeMode', JSON.stringify('dark'));
    vi.resetModules();

    const { useAppStore: reloaded } = await import('./useAppStore');

    expect(reloaded.getState().themeMode).toBe('dark');
  });

  it('follows the system theme until the user picks one', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    vi.resetModules();

    const { useAppStore: reloaded } = await import('./useAppStore');

    expect(reloaded.getState().themeMode).toBe('dark');
    expect(localStorage.getItem('themeMode')).toBeNull();
  });

  it('prefers the saved choice over the system theme', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    localStorage.setItem('themeMode', JSON.stringify('light'));
    vi.resetModules();

    const { useAppStore: reloaded } = await import('./useAppStore');

    expect(reloaded.getState().themeMode).toBe('light');
  });
});
