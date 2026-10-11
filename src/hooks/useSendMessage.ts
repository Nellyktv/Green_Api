import { useState } from 'react';
import { sendMessage } from '../api/greenApi';
import { useChatStore } from '../store/useChatStore';
import { useTranslation } from './useTranslation';
import type { Credentials } from '../types';

export const useSendMessage = (credentials: Credentials, chatId: string) => {
  const addMessage = useChatStore((s) => s.addMessage);
  const t = useTranslation();
  const [error, setError] = useState('');

  // Возвращает true, если сообщение ушло — тогда поле ввода можно очистить
  const send = async (text: string) => {
    try {
      const { idMessage } = await sendMessage(credentials, chatId, text);
      addMessage({ id: idMessage, chatId, text, type: 'outgoing', timestamp: Date.now() });
      return true;
    } catch (err) {
      console.error(err);
      setError(t.errors.sendFailed);
      return false;
    }
  };

  const resetError = () => setError('');

  return { send, error, resetError };
};
