import type { Credentials } from '../types';

export const DEFAULT_API_URL = 'https://api.green-api.com';

export type CredentialError = 'required' | 'idInstance' | 'apiUrl';

export const normalizeCredentials = (form: Credentials): Credentials => ({
  idInstance: form.idInstance.trim(),
  apiTokenInstance: form.apiTokenInstance.trim(),
  apiUrl: (form.apiUrl.trim() || DEFAULT_API_URL).replace(/\/+$/, ''),
});

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

// Only catches typos early; whether the instance exists and is authorized is decided by the server.
// An empty apiUrl is fine because normalizeCredentials falls back to the default one
export const validateCredentials = (form: Credentials) => {
  const { idInstance, apiTokenInstance, apiUrl } = normalizeCredentials(form);
  const errors: Partial<Record<keyof Credentials, CredentialError>> = {};

  if (!idInstance) errors.idInstance = 'required';
  else if (!/^\d+$/.test(idInstance)) errors.idInstance = 'idInstance';
  if (!apiTokenInstance) errors.apiTokenInstance = 'required';
  if (!isHttpsUrl(apiUrl)) errors.apiUrl = 'apiUrl';

  return errors;
};
