import type {
  CheckAccountResponse,
  Credentials,
  DeleteNotificationResponse,
  GreenApiNotification,
  HistoryMessage,
  Recipient,
  SendMessageResponse,
  StateInstanceResponse,
} from '../types';
import api from './client';

export const RECEIVE_TIMEOUT_SEC = 20;
export const HISTORY_COUNT = 50;

// Любой метод GREEN-API вызывается по адресу {apiUrl}/waInstance{idInstance}/{method}/{apiTokenInstance}
export const buildMethodUrl = (credentials: Credentials, method: string) =>
  `${credentials.apiUrl}/waInstance${credentials.idInstance}/${method}/${credentials.apiTokenInstance}`;

export const getStateInstance = async (credentials: Credentials) => {
  const { data } = await api.get<StateInstanceResponse>(buildMethodUrl(credentials, 'getStateInstance'));
  return data;
};

export const checkAccount = async (credentials: Credentials, recipient: Recipient) => {
  const { data } = await api.post<CheckAccountResponse>(buildMethodUrl(credentials, 'checkAccount'), recipient);
  return data;
};

export const sendMessage = async (credentials: Credentials, chatId: string, message: string) => {
  const { data } = await api.post<SendMessageResponse>(buildMethodUrl(credentials, 'sendMessage'), {
    chatId,
    message,
  });
  return data;
};

export const getChatHistory = async (credentials: Credentials, chatId: string) => {
  const { data } = await api.post<HistoryMessage[]>(buildMethodUrl(credentials, 'getChatHistory'), {
    chatId,
    count: HISTORY_COUNT,
  });
  return data;
};

// Long polling: сервер держит запрос до receiveTimeout секунд и отдаёт null, если уведомлений нет
export const receiveNotification = async (credentials: Credentials, signal?: AbortSignal) => {
  const { data } = await api.get<GreenApiNotification | null>(buildMethodUrl(credentials, 'receiveNotification'), {
    params: { receiveTimeout: RECEIVE_TIMEOUT_SEC },
    signal,
  });
  return data || null;
};

export const deleteNotification = async (credentials: Credentials, receiptId: number) => {
  const url = `${buildMethodUrl(credentials, 'deleteNotification')}/${receiptId}`;
  const { data } = await api.delete<DeleteNotificationResponse>(url);
  return data;
};
