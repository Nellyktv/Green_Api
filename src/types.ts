export type Locale = 'ru' | 'en';

export type ThemeMode = 'light' | 'dark';

export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

export interface Chat {
  chatId: string;
  name: string;
}

export type MessageType = 'incoming' | 'outgoing';

export interface Message {
  id: string;
  chatId: string;
  text: string;
  type: MessageType;
  timestamp: number;
}

export type Recipient = { phoneNumber: number } | { username: string };

// GREEN-API responses

export interface StateInstanceResponse {
  stateInstance: string;
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  username?: string;
  phoneNumber?: number;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface DeleteNotificationResponse {
  result: boolean;
}

export interface HistoryMessage {
  type: MessageType;
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage?: string;
  extendedTextMessage?: { text: string };
}

export interface SenderData {
  chatId: string;
  chatName?: string;
  sender: string;
  senderName?: string;
}

export interface MessageData {
  typeMessage: string;
  textMessageData?: { textMessage: string };
  extendedTextMessageData?: { text: string };
}

export interface NotificationBody {
  typeWebhook: string;
  timestamp: number;
  idMessage?: string;
  senderData?: SenderData;
  messageData?: MessageData;
}

export interface GreenApiNotification {
  receiptId: number;
  body: NotificationBody;
}
