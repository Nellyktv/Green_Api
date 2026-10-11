import type { Message, MessageData, NotificationBody } from '../types';

interface ParsedNotification {
  message: Message;
  chatName: string;
}

const getMessageText = (messageData?: MessageData) => {
  if (messageData?.typeMessage === 'textMessage') return messageData.textMessageData?.textMessage;
  if (messageData?.typeMessage === 'extendedTextMessage') return messageData.extendedTextMessageData?.text;
  return undefined;
};

// incomingMessageReceived — нам написали, outgoingMessageReceived — мы написали с телефона.
// Сообщения, отправленные из этого чата (outgoingAPIMessageReceived), уже добавлены при отправке,
// а статусы, медиа и прочие уведомления по ТЗ не нужны — их пропускаем
export const parseNotification = (body: NotificationBody): ParsedNotification | null => {
  const isIncoming = body.typeWebhook === 'incomingMessageReceived';
  const isOutgoing = body.typeWebhook === 'outgoingMessageReceived';
  if (!isIncoming && !isOutgoing) return null;

  const text = getMessageText(body.messageData);
  if (!text || !body.idMessage || !body.senderData) return null;

  const { chatId, chatName, senderName } = body.senderData;

  return {
    message: {
      id: body.idMessage,
      chatId,
      text,
      type: isIncoming ? 'incoming' : 'outgoing',
      timestamp: body.timestamp * 1000,
    },
    chatName: chatName || senderName || chatId,
  };
};
