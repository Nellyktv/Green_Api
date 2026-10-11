import { create } from 'zustand';
import type { Chat, Message } from '../types';
import { loadFromStorage, saveToStorage } from '../lib/storage';

const STORAGE_KEY = 'chats';

type ChatStore = {
  chats: Chat[];
  messages: Record<string, Message[]>;
  activeChatId: string | null;
  openChat: (chat: Chat) => void;
  selectChat: (chatId: string | null) => void;
  addMessage: (message: Message, chatName?: string) => void;
  addHistory: (chatId: string, history: Message[]) => void;
  reset: () => void;
};

type SavedChats = Pick<ChatStore, 'chats' | 'messages'>;

const saved = loadFromStorage<SavedChats>(STORAGE_KEY, { chats: [], messages: {} });

export const useChatStore = create<ChatStore>((set) => ({
  chats: saved.chats,
  messages: saved.messages,
  activeChatId: null,

  // Создаёт чат, если его ещё нет, и сразу открывает
  openChat: (chat) =>
    set((state) => ({
      chats: state.chats.some((el) => el.chatId === chat.chatId) ? state.chats : [chat, ...state.chats],
      activeChatId: chat.chatId,
    })),

  selectChat: (chatId) => set({ activeChatId: chatId }),

  addMessage: (message, chatName) =>
    set((state) => {
      const chatMessages = state.messages[message.chatId] ?? [];
      // Одно уведомление может прийти повторно, если его не успели удалить из очереди
      if (chatMessages.some((el) => el.id === message.id)) return state;

      // Если нам написали первыми — чата ещё нет, создаём. Чат с новым сообщением поднимаем наверх
      const chat = state.chats.find((el) => el.chatId === message.chatId) ?? {
        chatId: message.chatId,
        name: chatName || message.chatId,
      };

      return {
        chats: [chat, ...state.chats.filter((el) => el.chatId !== message.chatId)],
        messages: { ...state.messages, [message.chatId]: [...chatMessages, message] },
      };
    }),

  // История приходит с сервера целиком: добавляем только то, чего ещё нет, и сортируем по времени
  addHistory: (chatId, history) =>
    set((state) => {
      const chatMessages = state.messages[chatId] ?? [];
      const knownIds = new Set(chatMessages.map((el) => el.id));
      const newMessages = history.filter((el) => !knownIds.has(el.id));
      if (newMessages.length === 0) return state;

      const merged = [...chatMessages, ...newMessages].sort((a, b) => a.timestamp - b.timestamp);
      return { messages: { ...state.messages, [chatId]: merged } };
    }),

  reset: () => set({ chats: [], messages: {}, activeChatId: null }),
}));

// Сохраняем переписку, чтобы она не пропадала после перезагрузки страницы
// Выбор чата меняет только activeChatId — переписку в этом случае заново не пишем
useChatStore.subscribe((state, prev) => {
  if (state.chats === prev.chats && state.messages === prev.messages) return;
  saveToStorage(STORAGE_KEY, { chats: state.chats, messages: state.messages });
});
