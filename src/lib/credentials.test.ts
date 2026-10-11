import { describe, expect, it } from 'vitest';
import { DEFAULT_API_URL, normalizeCredentials } from './credentials';

describe('normalizeCredentials', () => {
  it('trims spaces and the trailing slash of apiUrl', () => {
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

  it('uses the default apiUrl when the field is empty', () => {
    const credentials = normalizeCredentials({ idInstance: '1', apiTokenInstance: '2', apiUrl: '  ' });
    expect(credentials.apiUrl).toBe(DEFAULT_API_URL);
  });
});
