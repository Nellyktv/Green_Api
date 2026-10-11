import axios from 'axios';
import { useEffect } from 'react';
import { deleteNotification, receiveNotification } from '../api/greenApi';
import { parseNotification } from '../lib/notification';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import type { Credentials } from '../types';

export const ERROR_RETRY_DELAY = 5000;

const isAuthError = (error: unknown) =>
  axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Получение сообщений через HTTP API: в цикле забираем уведомление из очереди,
// обрабатываем, удаляем его и только потом берём следующее
export const useNotifications = (credentials: Credentials) => {
  const addMessage = useChatStore((s) => s.addMessage);

  useEffect(() => {
    const controller = new AbortController();

    const poll = async () => {
      while (!controller.signal.aborted) {
        try {
          const notification = await receiveNotification(credentials, controller.signal);
          if (!notification) continue;

          const parsed = parseNotification(notification.body);
          if (parsed) addMessage(parsed.message, parsed.chatName);

          await deleteNotification(credentials, notification.receiptId);
        } catch (error) {
          if (controller.signal.aborted) return;
          // Токен отозван или неверный — повторять бессмысленно, возвращаем на экран входа
          if (isAuthError(error)) {
            useAuthStore.getState().logout();
            return;
          }
          console.error('Не удалось получить уведомление', error);
          await wait(ERROR_RETRY_DELAY);
        }
      }
    };

    void poll();

    // При выходе из аккаунта обрываем текущий запрос и останавливаем цикл
    return () => controller.abort();
  }, [credentials, addMessage]);
};
