import { DEFAULT_API_URL } from '../../lib/credentials';
import type { Credentials } from '../../types';

type LoginField = {
  name: keyof Credentials;
  type?: 'text' | 'password';
};

// Field labels are GREEN-API parameter names, so they are the same in every language
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
