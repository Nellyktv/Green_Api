import { useEffect, useState } from 'react';
import { getChatHistory } from '../api/greenApi';
import { parseHistory } from '../lib/history';
import { useChatStore } from '../store/useChatStore';
import type { Credentials } from '../types';

// При открытии чата подтягиваем историю с сервера — так переписка видна даже после повторного входа
export const useChatHistory = (credentials: Credentials, chatId: string) => {
  const addHistory = useChatStore((s) => s.addHistory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getChatHistory(credentials, chatId)
      .then((history) => {
        if (!cancelled) addHistory(chatId, parseHistory(history));
      })
      .catch((error) => console.error('Не удалось загрузить историю чата', error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [credentials, chatId, addHistory]);

  return loading;
};
