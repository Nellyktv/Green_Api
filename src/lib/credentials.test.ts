import { describe, expect, it } from 'vitest';
import { DEFAULT_API_URL, normalizeCredentials } from './credentials';

describe('normalizeCredentials', () => {
  it('убирает пробелы и слэш в конце apiUrl', () => {
    expect(
      normalizeCredentials({
        idInstance: ' 4100000001 ',
        apiTokenInstance: ' token123\n',
        apiUrl: 'https://4100.api.green-api.com/ ',
      }),
    ).toEqual({
      idInstance: '4100000001',
      apiTokenInstance: 'token123',
      apiUrl: 'https://4100.api.green-api.com',
    });
  });

  it('подставляет apiUrl по умолчанию, если поле пустое', () => {
    const credentials = normalizeCredentials({ idInstance: '1', apiTokenInstance: '2', apiUrl: '  ' });
    expect(credentials.apiUrl).toBe(DEFAULT_API_URL);
  });
});
