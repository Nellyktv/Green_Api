import type {
  CheckAccountResponse,
  CheckWhatsappResponse,
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

// Every GREEN-API method is called at {apiUrl}/waInstance{idInstance}/{method}/{apiTokenInstance}
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

// WhatsApp chats are addressed as <number>@c.us, so the lookup only tells whether the account exists
export const checkWhatsapp = async (credentials: Credentials, phoneNumber: number) => {
  const { data } = await api.post<CheckWhatsappResponse>(buildMethodUrl(credentials, 'checkWhatsapp'), {
    chatId: `${phoneNumber}@c.us`,
  });
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

// Long polling: the server holds the request for up to receiveTimeout seconds and returns null if there are no notifications
export const receiveNotification = async (credentials: Credentials, signal?: AbortSignal) => {
  const { data } = await api.get<GreenApiNotification | null>(buildMethodUrl(credentials, 'receiveNotification'), {
    params: { receiveTimeout: RECEIVE_TIMEOUT_SEC },
    // Extra margin: the client must not abort long polling before the server does
    timeout: (RECEIVE_TIMEOUT_SEC + 10) * 1000,
    signal,
  });
  return data || null;
};

export const deleteNotification = async (credentials: Credentials, receiptId: number) => {
  const url = `${buildMethodUrl(credentials, 'deleteNotification')}/${receiptId}`;
  const { data } = await api.delete<DeleteNotificationResponse>(url);
  return data;
};
