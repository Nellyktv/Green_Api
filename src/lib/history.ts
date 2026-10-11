import type { HistoryMessage, Message } from '../types';

const TEXT_TYPES = ['textMessage', 'extendedTextMessage'];

export const parseHistory = (history: HistoryMessage[]): Message[] =>
  history
    .filter((el) => TEXT_TYPES.includes(el.typeMessage))
    .map((el) => ({
      id: el.idMessage,
      chatId: el.chatId,
      text: el.textMessage || el.extendedTextMessage?.text || '',
      type: el.type,
      timestamp: el.timestamp * 1000,
    }))
    .filter((el) => el.text !== '')
    .sort((a, b) => a.timestamp - b.timestamp);
