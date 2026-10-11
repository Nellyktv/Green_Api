import { describe, expect, it } from 'vitest';
import { CHAT_ID, createNotificationBody } from '../test/fixtures';
import { parseNotification } from './notification';

describe('parseNotification', () => {
  it('turns an incoming text message into a chat message', () => {
    expect(parseNotification(createNotificationBody())).toEqual({
      message: {
        id: 'msg-1',
        chatId: CHAT_ID,
        text: 'Hello from Green-API!',
        type: 'incoming',
        timestamp: 1_763_115_112_000,
      },
      chatName: 'Vasilisa',
    });
  });

  it('marks a message sent from the phone as outgoing', () => {
    const parsed = parseNotification(createNotificationBody({ typeWebhook: 'outgoingMessageReceived' }));
    expect(parsed?.message.type).toBe('outgoing');
  });

  it('understands extendedTextMessage (text with a link)', () => {
    const parsed = parseNotification(
      createNotificationBody({
        messageData: {
          typeMessage: 'extendedTextMessage',
          extendedTextMessageData: { text: 'https://green-api.com' },
        },
      }),
    );
    expect(parsed?.message.text).toBe('https://green-api.com');
  });

  it('uses the sender name or chatId when the chat has no name', () => {
    const withSenderName = createNotificationBody({
      senderData: { chatId: CHAT_ID, sender: CHAT_ID, senderName: 'Vasilisa the Wise' },
    });
    const withoutNames = createNotificationBody({
      senderData: { chatId: CHAT_ID, sender: CHAT_ID },
    });

    expect(parseNotification(withSenderName)?.chatName).toBe('Vasilisa the Wise');
    expect(parseNotification(withoutNames)?.chatName).toBe(CHAT_ID);
  });

  it('skips messages sent through the API — they are already added on send', () => {
    expect(parseNotification(createNotificationBody({ typeWebhook: 'outgoingAPIMessageReceived' }))).toBeNull();
  });

  it('skips non-text messages and service notifications', () => {
    const image = createNotificationBody({ messageData: { typeMessage: 'imageMessage' } });
    const status = { typeWebhook: 'stateInstanceChanged', timestamp: 1_763_115_112 };

    expect(parseNotification(image)).toBeNull();
    expect(parseNotification(status)).toBeNull();
  });
});
