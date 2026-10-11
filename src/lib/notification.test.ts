import { describe, expect, it } from 'vitest';
import { CHAT_ID, createNotificationBody } from '../test/fixtures';
import { parseNotification } from './notification';

describe('parseNotification', () => {
  it('превращает входящее текстовое сообщение в сообщение чата', () => {
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

  it('сообщение, отправленное с телефона, помечает как исходящее', () => {
    const parsed = parseNotification(createNotificationBody({ typeWebhook: 'outgoingMessageReceived' }));
    expect(parsed?.message.type).toBe('outgoing');
  });

  it('понимает extendedTextMessage (текст со ссылкой)', () => {
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

  it('берёт имя отправителя или chatId, если у чата нет названия', () => {
    const withSenderName = createNotificationBody({
      senderData: { chatId: CHAT_ID, sender: CHAT_ID, senderName: 'Vasilisa the Wise' },
    });
    const withoutNames = createNotificationBody({
      senderData: { chatId: CHAT_ID, sender: CHAT_ID },
    });

    expect(parseNotification(withSenderName)?.chatName).toBe('Vasilisa the Wise');
    expect(parseNotification(withoutNames)?.chatName).toBe(CHAT_ID);
  });

  it('пропускает сообщения, отправленные через API — они уже добавлены при отправке', () => {
    expect(parseNotification(createNotificationBody({ typeWebhook: 'outgoingAPIMessageReceived' }))).toBeNull();
  });

  it('пропускает нетекстовые сообщения и служебные уведомления', () => {
    const image = createNotificationBody({ messageData: { typeMessage: 'imageMessage' } });
    const status = { typeWebhook: 'stateInstanceChanged', timestamp: 1_763_115_112 };

    expect(parseNotification(image)).toBeNull();
    expect(parseNotification(status)).toBeNull();
  });
});
