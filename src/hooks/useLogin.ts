import { useState } from 'react';
import { getStateInstance } from '../api/greenApi';
import { normalizeCredentials } from '../lib/credentials';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from './useTranslation';
import type { Credentials } from '../types';

export const useLogin = () => {
  const login = useAuthStore((s) => s.login);
  const t = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Перед входом проверяем, что данные верные и к инстансу уже привязан аккаунт Telegram
  const submit = async (form: Credentials) => {
    const credentials = normalizeCredentials(form);
    setLoading(true);
    setError('');

    try {
      const { stateInstance } = await getStateInstance(credentials);
      if (stateInstance === 'authorized') {
        login(credentials);
      } else {
        setError(t.errors.notAuthorized(stateInstance));
      }
    } catch (err) {
      console.error(err);
      setError(t.errors.connection);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
