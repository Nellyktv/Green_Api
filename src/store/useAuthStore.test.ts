import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CHAT_ID, credentials } from '../test/fixtures';
import { useAuthStore } from './useAuthStore';
import { useChatStore } from './useChatStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ credentials: null });
  });

  it('login saves the instance data, logout removes it', () => {
    useAuthStore.getState().login(credentials);
    expect(useAuthStore.getState().credentials).toEqual(credentials);
    expect(JSON.parse(localStorage.getItem('credentials') ?? 'null')).toEqual(credentials);

    useAuthStore.getState().logout();
    expect(useAuthStore.getState().credentials).toBeNull();
    expect(localStorage.getItem('credentials')).toBeNull();
  });

  it('logout also clears the conversations', () => {
    useChatStore.getState().openChat({ chatId: CHAT_ID, name: 'Vasilisa' });

    useAuthStore.getState().logout();

    expect(useChatStore.getState().chats).toEqual([]);
    expect(useChatStore.getState().activeChatId).toBeNull();
  });

  it('the user stays signed in after a page reload', async () => {
    localStorage.setItem('credentials', JSON.stringify(credentials));
    vi.resetModules();

    const { useAuthStore: reloadedStore } = await import('./useAuthStore');

    expect(reloadedStore.getState().credentials).toEqual(credentials);
  });
});
