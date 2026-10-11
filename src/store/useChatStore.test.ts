import { beforeEach, describe, expect, it } from 'vitest';
import { CHAT_ID, createMessage } from '../test/fixtures';
import { useChatStore } from './useChatStore';

const OTHER_CHAT_ID = '20000000';

describe('useChatStore', () => {
  beforeEach(() => {
    useChatStore.setState({ chats: [], messages: {}, activeChatId: null });
  });

  it('создаёт чат, если нам написали первыми', () => {
    useChatStore.getState().addMessage(createMessage(), 'Vasilisa');

    const { chats, messages } = useChatStore.getState();
    expect(chats).toEqual([{ chatId: CHAT_ID, name: 'Vasilisa' }]);
    expect(messages[CHAT_ID]).toHaveLength(1);
  });

  it('не дублирует сообщение, если уведомление пришло повторно', () => {
    const { addMessage } = useChatStore.getState();
    addMessage(createMessage());
    addMessage(createMessage());

    expect(useChatStore.getState().messages[CHAT_ID]).toHaveLength(1);
  });

  it('поднимает чат с новым сообщением наверх списка', () => {
    const { addMessage } = useChatStore.getState();
    addMessage(createMessage({ id: '1' }));
    addMessage(createMessage({ id: '2', chatId: OTHER_CHAT_ID }));
    addMessage(createMessage({ id: '3' }));

    expect(useChatStore.getState().chats.map((el) => el.chatId)).toEqual([CHAT_ID, OTHER_CHAT_ID]);
  });

  it('openChat открывает существующий чат, не создавая копию', () => {
    const { openChat } = useChatStore.getState();
    openChat({ chatId: CHAT_ID, name: '+375291234567' });
    openChat({ chatId: CHAT_ID, name: '+375291234567' });

    const { chats, activeChatId } = useChatStore.getState();
    expect(chats).toHaveLength(1);
    expect(activeChatId).toBe(CHAT_ID);
  });

  it('addHistory добавляет только новые сообщения и сортирует по времени', () => {
    const { addMessage, addHistory } = useChatStore.getState();
    addMessage(createMessage({ id: 'b', timestamp: 2000 }));
    addHistory(CHAT_ID, [
      createMessage({ id: 'a', timestamp: 1000 }),
      createMessage({ id: 'b', timestamp: 2000 }),
      createMessage({ id: 'c', timestamp: 3000 }),
    ]);

    expect(useChatStore.getState().messages[CHAT_ID].map((el) => el.id)).toEqual(['a', 'b', 'c']);
  });

  it('сохраняет переписку в localStorage', () => {
    useChatStore.getState().addMessage(createMessage(), 'Vasilisa');

    const saved = JSON.parse(localStorage.getItem('chats') ?? '{}');
    expect(saved.chats).toEqual([{ chatId: CHAT_ID, name: 'Vasilisa' }]);
    expect(saved.messages[CHAT_ID]).toHaveLength(1);
  });

  it('reset очищает чаты, сообщения и открытый чат', () => {
    const { openChat, addMessage, reset } = useChatStore.getState();
    openChat({ chatId: CHAT_ID, name: 'Vasilisa' });
    addMessage(createMessage());
    reset();

    expect(useChatStore.getState()).toMatchObject({ chats: [], messages: {}, activeChatId: null });
  });
});
