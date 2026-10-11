import { describe, expect, it } from 'vitest';
import { createHistoryMessage } from '../test/fixtures';
import { parseHistory } from './history';

describe('parseHistory', () => {
  it('оставляет только текстовые сообщения и сортирует от старых к новым', () => {
    const history = [
      createHistoryMessage({ idMessage: '3', timestamp: 300, type: 'outgoing', textMessage: 'третье' }),
      createHistoryMessage({ idMessage: 'img', timestamp: 250, typeMessage: 'imageMessage', textMessage: undefined }),
      createHistoryMessage({ idMessage: '1', timestamp: 100, textMessage: 'первое' }),
      createHistoryMessage({
        idMessage: '2',
        timestamp: 200,
        typeMessage: 'extendedTextMessage',
        textMessage: undefined,
        extendedTextMessage: { text: 'второе' },
      }),
    ];

    expect(parseHistory(history).map((el) => el.text)).toEqual(['первое', 'второе', 'третье']);
  });

  it('переводит время из секунд в миллисекунды и сохраняет направление сообщения', () => {
    const [message] = parseHistory([createHistoryMessage({ timestamp: 1_700_000_000, type: 'outgoing' })]);

    expect(message.timestamp).toBe(1_700_000_000_000);
    expect(message.type).toBe('outgoing');
  });
});
