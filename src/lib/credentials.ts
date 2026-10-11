import type { Credentials } from '../types';

export const DEFAULT_API_URL = 'https://api.green-api.com';

export const normalizeCredentials = (form: Credentials): Credentials => ({
  idInstance: form.idInstance.trim(),
  apiTokenInstance: form.apiTokenInstance.trim(),
  apiUrl: (form.apiUrl.trim() || DEFAULT_API_URL).replace(/\/+$/, ''),
});
