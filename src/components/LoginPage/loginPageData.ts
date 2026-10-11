import { DEFAULT_API_URL } from '../../lib/credentials';
import type { Credentials } from '../../types';

type LoginField = {
  name: keyof Credentials;
  type?: 'text' | 'password';
};

// Подписи полей — это названия параметров GREEN-API, поэтому они одинаковые на всех языках
export const loginFields: LoginField[] = [
  { name: 'idInstance' },
  { name: 'apiTokenInstance', type: 'password' },
  { name: 'apiUrl' },
];

export const initialForm: Credentials = {
  idInstance: '',
  apiTokenInstance: '',
  apiUrl: DEFAULT_API_URL,
};

export const CONSOLE_URL = 'https://console.green-api.com';
