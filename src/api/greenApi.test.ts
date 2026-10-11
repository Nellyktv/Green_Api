import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axiosResponse, CHAT_ID, credentials } from '../test/fixtures';
import api from './client';
import {
  buildMethodUrl,
  checkAccount,
  deleteNotification,
  getChatHistory,
  HISTORY_COUNT,
  receiveNotification,
  RECEIVE_TIMEOUT_SEC,
  sendMessage,
} from './greenApi';

vi.mock('./client', () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

const BASE = 'https://4100.api.green-api.com/waInstance4100000001';

describe('greenApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('builds the method URL from apiUrl, idInstance and apiTokenInstance', () => {
    expect(buildMethodUrl(credentials, 'sendMessage')).toBe(`${BASE}/sendMessage/token123`);
  });

  it('sendMessage sends chatId and text', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse({ idMessage: 'id-1' }));

    const result = await sendMessage(credentials, CHAT_ID, 'Hello');

    expect(api.post).toHaveBeenCalledWith(`${BASE}/sendMessage/token123`, { chatId: CHAT_ID, message: 'Hello' });
    expect(result).toEqual({ idMessage: 'id-1' });
  });

  it('checkAccount passes the phone number as is', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse({ exist: true, chatId: CHAT_ID }));

    await checkAccount(credentials, { phoneNumber: 375291234567 });

    expect(api.post).toHaveBeenCalledWith(`${BASE}/checkAccount/token123`, { phoneNumber: 375291234567 });
  });

  it('getChatHistory requests the latest chat messages', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse([]));

    await getChatHistory(credentials, CHAT_ID);

    expect(api.post).toHaveBeenCalledWith(`${BASE}/getChatHistory/token123`, { chatId: CHAT_ID, count: HISTORY_COUNT });
  });

  it('receiveNotification passes receiveTimeout and signal and turns an empty response into null', async () => {
    const controller = new AbortController();
    vi.mocked(api.get).mockResolvedValue(axiosResponse(''));

    const result = await receiveNotification(credentials, controller.signal);

    expect(api.get).toHaveBeenCalledWith(`${BASE}/receiveNotification/token123`, {
      params: { receiveTimeout: RECEIVE_TIMEOUT_SEC },
      timeout: (RECEIVE_TIMEOUT_SEC + 10) * 1000,
      signal: controller.signal,
    });
    expect(result).toBeNull();
  });

  it('deleteNotification appends receiptId to the URL', async () => {
    vi.mocked(api.delete).mockResolvedValue(axiosResponse({ result: true }));

    await deleteNotification(credentials, 42);

    expect(api.delete).toHaveBeenCalledWith(`${BASE}/deleteNotification/token123/42`);
  });
});
