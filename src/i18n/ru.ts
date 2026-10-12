import type { Credentials } from '../types';

export const ru = {
  login: {
    subtitle: 'Telegram и WhatsApp через GREEN-API',
    messenger: 'Мессенджер',
    submit: 'Войти',
    hints: {
      apiUrl: 'Если в личном кабинете указан другой — скопируйте его',
    } as Partial<Record<keyof Credentials, string>>,
    consoleHint: 'Данные инстанса есть в',
    consoleLink: 'личном кабинете GREEN-API',
    title: 'Вход по данным инстанса',
    help: 'Где взять данные',
    advanced: 'Дополнительно',
    showToken: 'Показать токен',
    hideToken: 'Скрыть токен',
    errors: {
      required: 'Заполните поле',
      idInstance: 'idInstance состоит только из цифр',
      apiUrl: 'Адрес вида https://api.green-api.com',
    },
  },
  sidebar: {
    title: 'Чаты',
    instance: 'Инстанс',
    newChat: 'Новый чат',
    logout: 'Выйти',
    empty: 'Чатов пока нет. Создайте новый чат по номеру телефона или дождитесь, пока вам напишут',
    you: 'Вы',
    noMessages: 'Нет сообщений',
  },
  newChat: {
    title: 'Новый чат',
    label: 'Номер телефона или @username',
    labelPhone: 'Номер телефона',
    hint: 'Номер в международном формате, с кодом страны',
    cancel: 'Отмена',
    submit: 'Создать чат',
  },
  chat: {
    select: 'Выберите чат или создайте новый',
    empty: 'Сообщений пока нет — напишите первым',
    placeholder: 'Сообщение',
    send: 'Отправить',
    back: 'Назад',
  },
  status: {
    offline: 'Нет связи. Пробуем снова…',
  },
  errors: {
    notAuthorized: (status: string) =>
      `Инстанс не авторизован (статус: ${status}). Привяжите аккаунт мессенджера в личном кабинете GREEN-API`,
    connection: 'Не удалось подключиться. Проверьте idInstance, apiTokenInstance и apiUrl',
    invalidRecipient: 'Введите номер в международном формате или @username',
    accountNotFound: 'Аккаунт в мессенджере не найден',
    invalidPhone: 'Введите номер в международном формате',
    checkFailed: 'Не удалось проверить номер, попробуйте ещё раз',
    sendFailed: 'Не удалось отправить сообщение',
  },
  language: 'Язык',
  theme: {
    toDark: 'Тёмная тема',
    toLight: 'Светлая тема',
  },
};

export type Translation = typeof ru;
