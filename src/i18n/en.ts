import type { Translation } from './ru';

export const en: Translation = {
  login: {
    subtitle: 'Telegram via GREEN-API',
    submit: 'Sign in',
    hints: {
      apiUrl: 'If your console shows a different one, copy it here',
    },
    consoleHint: 'You can find the instance data in the',
    consoleLink: 'GREEN-API console',
    title: 'Sign in with your instance',
    help: 'Where to find the data',
    advanced: 'Advanced',
    showToken: 'Show token',
    hideToken: 'Hide token',
    errors: {
      required: 'This field is required',
      idInstance: 'idInstance contains digits only',
      apiUrl: 'Use an address like https://api.green-api.com',
    },
  },
  sidebar: {
    title: 'Chats',
    instance: 'Instance',
    newChat: 'New chat',
    logout: 'Log out',
    empty: 'No chats yet. Start a new chat by phone number or wait until someone writes to you',
    you: 'You',
    noMessages: 'No messages',
  },
  newChat: {
    title: 'New chat',
    label: 'Phone number or @username',
    hint: 'International format, with the country code',
    cancel: 'Cancel',
    submit: 'Create chat',
  },
  chat: {
    select: 'Select a chat or start a new one',
    empty: 'No messages yet — say hi first',
    placeholder: 'Message',
    send: 'Send',
    back: 'Back',
  },
  status: {
    offline: 'No connection. Retrying…',
  },
  errors: {
    notAuthorized: (status: string) =>
      `The instance is not authorized (status: ${status}). Link your Telegram account in the GREEN-API console`,
    connection: 'Could not connect. Check idInstance, apiTokenInstance and apiUrl',
    invalidRecipient: 'Enter a number in international format or a @username',
    accountNotFound: 'Telegram account not found',
    checkFailed: 'Could not check the number, please try again',
    sendFailed: 'Could not send the message',
  },
  language: 'Language',
};
