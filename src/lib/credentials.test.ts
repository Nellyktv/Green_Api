import { describe, expect, it } from 'vitest';
import { DEFAULT_API_URL, normalizeCredentials, validateCredentials } from './credentials';

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

describe('validateCredentials', () => {
  const valid = { idInstance: '4100000001', apiTokenInstance: 'token123', apiUrl: 'https://4100.api.green-api.com' };

  it('accepts correct data, also with an empty apiUrl', () => {
    expect(validateCredentials(valid)).toEqual({});
    expect(validateCredentials({ ...valid, apiUrl: '' })).toEqual({});
  });

  it('requires idInstance and apiTokenInstance', () => {
    expect(validateCredentials({ ...valid, idInstance: '  ', apiTokenInstance: '' })).toEqual({
      idInstance: 'required',
      apiTokenInstance: 'required',
    });
  });

  it('rejects an idInstance with anything but digits', () => {
    expect(validateCredentials({ ...valid, idInstance: '41000abc' })).toEqual({ idInstance: 'idInstance' });
  });

  it('rejects an apiUrl that is not an https address', () => {
    for (const apiUrl of ['api.green-api.com', 'http://api.green-api.com', 'https://', 'not a url']) {
      expect(validateCredentials({ ...valid, apiUrl })).toEqual({ apiUrl: 'apiUrl' });
    }
  });
});
