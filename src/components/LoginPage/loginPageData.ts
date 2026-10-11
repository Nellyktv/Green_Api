import { DEFAULT_API_URL } from '../../lib/credentials';
import type { Credentials } from '../../types';

// Field labels are GREEN-API parameter names, so they are the same in every language
export const loginFields: (keyof Credentials)[] = ['idInstance', 'apiTokenInstance', 'apiUrl'];

export const initialForm: Credentials = {
  idInstance: '',
  apiTokenInstance: '',
  apiUrl: DEFAULT_API_URL,
};

export const CONSOLE_URL = 'https://console.green-api.com';
