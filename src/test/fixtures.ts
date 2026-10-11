import type { AxiosResponse } from 'axios';
import type { Credentials, HistoryMessage, Message, NotificationBody } from '../types';

export const credentials: Credentials = {
  idInstance: '4100000001',
  apiTokenInstance: 'token123',
  apiUrl: 'https://4100.api.green-api.com',
};

export const CHAT_ID = '10000000';

export const createMessage = (overrides: Partial<Message> = {}): Message => ({
  id: 'msg-1',
  chatId: CHAT_ID,
  text: 'Привет',
  type: 'incoming',
  timestamp: 1_700_000_000_000,
  ...overrides,
});

export const createNotificationBody = (overrides: Partial<NotificationBody> = {}): NotificationBody => ({
  typeWebhook: 'incomingMessageReceived',
  timestamp: 1_763_115_112,
  idMessage: 'msg-1',
  senderData: {
    chatId: CHAT_ID,
    chatName: 'Vasilisa',
    sender: CHAT_ID,
    senderName: 'Vasilisa the Wise',
  },
  messageData: {
    typeMessage: 'textMessage',
    textMessageData: { textMessage: 'Hello from Green-API!' },
  },
  ...overrides,
});

export const createHistoryMessage = (overrides: Partial<HistoryMessage> = {}): HistoryMessage => ({
  type: 'incoming',
  idMessage: 'history-1',
  timestamp: 1_700_000_000,
  typeMessage: 'textMessage',
  chatId: CHAT_ID,
  textMessage: 'Сообщение из истории',
  ...overrides,
});

// axios возвращает не только data, но в api-функциях используется только она
export const axiosResponse = <T>(data: T) => ({ data }) as AxiosResponse<T>;

// Промис, который никогда не завершится — имитирует висящий long polling запрос
export const pending = () => new Promise<never>(() => {});
