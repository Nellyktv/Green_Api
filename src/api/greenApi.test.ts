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

  it('собирает адрес метода из apiUrl, idInstance и apiTokenInstance', () => {
    expect(buildMethodUrl(credentials, 'sendMessage')).toBe(`${BASE}/sendMessage/token123`);
  });

  it('sendMessage отправляет chatId и текст', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse({ idMessage: 'id-1' }));

    const result = await sendMessage(credentials, CHAT_ID, 'Привет');

    expect(api.post).toHaveBeenCalledWith(`${BASE}/sendMessage/token123`, { chatId: CHAT_ID, message: 'Привет' });
    expect(result).toEqual({ idMessage: 'id-1' });
  });

  it('checkAccount передаёт номер телефона как есть', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse({ exist: true, chatId: CHAT_ID }));

    await checkAccount(credentials, { phoneNumber: 375291234567 });

    expect(api.post).toHaveBeenCalledWith(`${BASE}/checkAccount/token123`, { phoneNumber: 375291234567 });
  });

  it('getChatHistory запрашивает последние сообщения чата', async () => {
    vi.mocked(api.post).mockResolvedValue(axiosResponse([]));

    await getChatHistory(credentials, CHAT_ID);

    expect(api.post).toHaveBeenCalledWith(`${BASE}/getChatHistory/token123`, { chatId: CHAT_ID, count: HISTORY_COUNT });
  });

  it('receiveNotification передаёт receiveTimeout и signal, а пустой ответ превращает в null', async () => {
    const controller = new AbortController();
    vi.mocked(api.get).mockResolvedValue(axiosResponse(''));

    const result = await receiveNotification(credentials, controller.signal);

    expect(api.get).toHaveBeenCalledWith(`${BASE}/receiveNotification/token123`, {
      params: { receiveTimeout: RECEIVE_TIMEOUT_SEC },
      signal: controller.signal,
    });
    expect(result).toBeNull();
  });

  it('deleteNotification добавляет receiptId в конец адреса', async () => {
    vi.mocked(api.delete).mockResolvedValue(axiosResponse({ result: true }));

    await deleteNotification(credentials, 42);

    expect(api.delete).toHaveBeenCalledWith(`${BASE}/deleteNotification/token123/42`);
  });
});
