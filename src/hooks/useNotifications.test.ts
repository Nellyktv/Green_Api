import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { deleteNotification, receiveNotification } from '../api/greenApi';
import { useChatStore } from '../store/useChatStore';
import { CHAT_ID, createNotificationBody, credentials, pending } from '../test/fixtures';
import { ERROR_RETRY_DELAY, useNotifications } from './useNotifications';

vi.mock('../api/greenApi', () => ({
  receiveNotification: vi.fn(),
  deleteNotification: vi.fn(),
}));

describe('useNotifications', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(deleteNotification).mockResolvedValue({ result: true });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    useChatStore.setState({ chats: [], messages: {}, activeChatId: null });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('добавляет входящее сообщение в чат и удаляет уведомление из очереди', async () => {
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce({ receiptId: 7, body: createNotificationBody() })
      .mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(deleteNotification).toHaveBeenCalledWith(credentials, 7));
    const { chats, messages } = useChatStore.getState();
    expect(chats).toEqual([{ chatId: CHAT_ID, name: 'Vasilisa' }]);
    expect(messages[CHAT_ID][0].text).toBe('Hello from Green-API!');
  });

  it('удаляет из очереди и те уведомления, которые не показываются в чате', async () => {
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce({ receiptId: 8, body: createNotificationBody({ typeWebhook: 'outgoingMessageStatus' }) })
      .mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(deleteNotification).toHaveBeenCalledWith(credentials, 8));
    expect(useChatStore.getState().chats).toEqual([]);
  });

  it('если очередь пуста — сразу ждёт следующее уведомление, ничего не удаляя', async () => {
    vi.mocked(receiveNotification).mockResolvedValueOnce(null).mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(receiveNotification).toHaveBeenCalledTimes(2));
    expect(deleteNotification).not.toHaveBeenCalled();
  });

  it('после ошибки сети делает паузу и пробует снова', async () => {
    vi.useFakeTimers();
    vi.mocked(receiveNotification).mockRejectedValueOnce(new Error('Network Error')).mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await vi.advanceTimersByTimeAsync(ERROR_RETRY_DELAY - 1);
    expect(receiveNotification).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(receiveNotification).toHaveBeenCalledTimes(2);
  });

  it('при размонтировании обрывает запрос и больше не опрашивает сервер', async () => {
    vi.mocked(receiveNotification).mockImplementation(
      (_credentials, signal) =>
        new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => reject(new Error('canceled')));
        }),
    );

    const { unmount } = renderHook(() => useNotifications(credentials));
    await waitFor(() => expect(receiveNotification).toHaveBeenCalledTimes(1));
    const signal = vi.mocked(receiveNotification).mock.calls[0][1];

    unmount();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(signal?.aborted).toBe(true);
    expect(receiveNotification).toHaveBeenCalledTimes(1);
  });
});
