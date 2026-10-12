import { DEFAULT_API_URL } from '../../lib/credentials';
import type { Credentials } from '../../types';

export const initialForm: Credentials = {
  idInstance: '',
  apiTokenInstance: '',
  apiUrl: DEFAULT_API_URL,
  messenger: 'telegram',
};

export const CONSOLE_URL = 'https://console.green-api.com';
