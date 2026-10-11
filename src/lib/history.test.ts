import { describe, expect, it } from 'vitest';
import { createHistoryMessage } from '../test/fixtures';
import { parseHistory } from './history';

describe('parseHistory', () => {
  it('keeps only text messages and sorts them from oldest to newest', () => {
    const history = [
      createHistoryMessage({ idMessage: '3', timestamp: 300, type: 'outgoing', textMessage: 'third' }),
      createHistoryMessage({ idMessage: 'img', timestamp: 250, typeMessage: 'imageMessage', textMessage: undefined }),
      createHistoryMessage({ idMessage: '1', timestamp: 100, textMessage: 'first' }),
      createHistoryMessage({
        idMessage: '2',
        timestamp: 200,
        typeMessage: 'extendedTextMessage',
        textMessage: undefined,
        extendedTextMessage: { text: 'second' },
      }),
    ];

    expect(parseHistory(history).map((el) => el.text)).toEqual(['first', 'second', 'third']);
  });

  it('converts time from seconds to milliseconds and keeps the message direction', () => {
    const [message] = parseHistory([createHistoryMessage({ timestamp: 1_700_000_000, type: 'outgoing' })]);

    expect(message.timestamp).toBe(1_700_000_000_000);
    expect(message.type).toBe('outgoing');
  });
});
