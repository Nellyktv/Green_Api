import { useState } from 'react';
import { checkAccount, checkWhatsapp } from '../api/greenApi';
import { getRecipientLabel, parseRecipient } from '../lib/recipient';
import { useChatStore } from '../store/useChatStore';
import { useTranslation } from './useTranslation';
import type { Credentials, Recipient } from '../types';

export const useCreateChat = (credentials: Credentials) => {
  const openChat = useChatStore((s) => s.openChat);
  const t = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const whatsapp = credentials.messenger === 'whatsapp';

  // Returns the chatId to write to, or null if the account does not exist.
  // Telegram messages can only be sent by chatId, so it is looked up via checkAccount;
  // in WhatsApp the chatId is simply <number>@c.us
  const findChatId = async (recipient: Recipient) => {
    if (whatsapp && 'phoneNumber' in recipient) {
      const { existsWhatsapp } = await checkWhatsapp(credentials, recipient.phoneNumber);
      return existsWhatsapp ? `${recipient.phoneNumber}@c.us` : null;
    }
    const account = await checkAccount(credentials, recipient);
    return account.exist ? account.chatId : null;
  };

  const createChat = async (value: string) => {
    const recipient = parseRecipient(value, credentials.messenger);
    if (!recipient) {
      setError(whatsapp ? t.errors.invalidPhone : t.errors.invalidRecipient);
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const chatId = await findChatId(recipient);
      if (!chatId) {
        setError(t.errors.accountNotFound);
        return false;
      }
      openChat({ chatId, name: getRecipientLabel(recipient) });
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
