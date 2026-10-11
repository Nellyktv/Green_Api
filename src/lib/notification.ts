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

// incomingMessageReceived — someone wrote to us, outgoingMessageReceived — we wrote from the phone.
// Messages sent from this chat (outgoingAPIMessageReceived) are already added on send,
// and statuses, media and other notifications are out of scope — skip them
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
