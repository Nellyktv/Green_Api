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

  openChat: (chat) =>
    set((state) => ({
      chats: state.chats.some((el) => el.chatId === chat.chatId) ? state.chats : [chat, ...state.chats],
      activeChatId: chat.chatId,
    })),

  selectChat: (chatId) => set({ activeChatId: chatId }),

  addMessage: (message, chatName) =>
    set((state) => {
      const chatMessages = state.messages[message.chatId] ?? [];
      // The same notification can arrive twice if it wasn't deleted from the queue in time
      if (chatMessages.some((el) => el.id === message.id)) return state;

      // If they wrote first, the chat doesn't exist yet — create it. A chat with a new message moves to the top
      const chat = state.chats.find((el) => el.chatId === message.chatId) ?? {
        chatId: message.chatId,
        name: chatName || message.chatId,
      };

      return {
        chats: [chat, ...state.chats.filter((el) => el.chatId !== message.chatId)],
        messages: { ...state.messages, [message.chatId]: [...chatMessages, message] },
      };
    }),

  // History arrives from the server in full: add only what is missing and sort by time
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

// Selecting a chat only changes activeChatId — don't rewrite the conversation in that case
useChatStore.subscribe((state, prev) => {
  if (state.chats === prev.chats && state.messages === prev.messages) return;
  saveToStorage(STORAGE_KEY, { chats: state.chats, messages: state.messages });
});
