import { useState } from 'react';
import { checkAccount } from '../api/greenApi';
import { getRecipientLabel, parseRecipient } from '../lib/recipient';
import { useChatStore } from '../store/useChatStore';
import { useTranslation } from './useTranslation';
import type { Credentials } from '../types';

export const useCreateChat = (credentials: Credentials) => {
  const openChat = useChatStore((s) => s.openChat);
  const t = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Telegram messages can only be sent by chatId, so first look it up by number via checkAccount
  const createChat = async (value: string) => {
    const recipient = parseRecipient(value);
    if (!recipient) {
      setError(t.errors.invalidRecipient);
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const account = await checkAccount(credentials, recipient);
      if (!account.exist) {
        setError(t.errors.accountNotFound);
        return false;
      }
      openChat({ chatId: account.chatId, name: getRecipientLabel(recipient) });
      return true;
    } catch (err) {
      console.error(err);
      setError(t.errors.checkFailed);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => setError('');

  return { createChat, loading, error, resetError };
};
