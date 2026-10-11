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
          // The token is revoked or invalid — retrying is pointless, go back to the login screen
          if (isAuthError(error)) {
            useAuthStore.getState().logout();
            return;
          }
          console.error('Failed to receive notification', error);
          await wait(ERROR_RETRY_DELAY);
        }
      }
    };

    void poll();

    return () => controller.abort();
  }, [credentials, addMessage]);
};
