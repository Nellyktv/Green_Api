import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { AxiosError, type AxiosResponse } from 'axios';
import { deleteNotification, receiveNotification } from '../api/greenApi';
import { useAuthStore } from '../store/useAuthStore';
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

  it('adds an incoming message to the chat and deletes the notification from the queue', async () => {
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce({ receiptId: 7, body: createNotificationBody() })
      .mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(deleteNotification).toHaveBeenCalledWith(credentials, 7));
    const { chats, messages } = useChatStore.getState();
    expect(chats).toEqual([{ chatId: CHAT_ID, name: 'Vasilisa' }]);
    expect(messages[CHAT_ID][0].text).toBe('Hello from Green-API!');
  });

  it('also deletes notifications that are not shown in the chat', async () => {
    vi.mocked(receiveNotification)
      .mockResolvedValueOnce({ receiptId: 8, body: createNotificationBody({ typeWebhook: 'outgoingMessageStatus' }) })
      .mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(deleteNotification).toHaveBeenCalledWith(credentials, 8));
    expect(useChatStore.getState().chats).toEqual([]);
  });

  it('when the queue is empty, waits for the next notification without deleting anything', async () => {
    vi.mocked(receiveNotification).mockResolvedValueOnce(null).mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(receiveNotification).toHaveBeenCalledTimes(2));
    expect(deleteNotification).not.toHaveBeenCalled();
  });

  it('pauses after a network error and tries again', async () => {
    vi.useFakeTimers();
    vi.mocked(receiveNotification).mockRejectedValueOnce(new Error('Network Error')).mockImplementation(pending);

    renderHook(() => useNotifications(credentials));

    await vi.advanceTimersByTimeAsync(ERROR_RETRY_DELAY - 1);
    expect(receiveNotification).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);
    expect(receiveNotification).toHaveBeenCalledTimes(2);
  });

  it('logs out and stops polling when the token is invalid', async () => {
    useAuthStore.setState({ credentials });
    const response = { status: 401 } as AxiosResponse;
    vi.mocked(receiveNotification).mockRejectedValue(
      new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', undefined, undefined, response),
    );

    renderHook(() => useNotifications(credentials));

    await waitFor(() => expect(useAuthStore.getState().credentials).toBeNull());
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(receiveNotification).toHaveBeenCalledTimes(1);
  });

  it('aborts the request on unmount and stops polling the server', async () => {
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
