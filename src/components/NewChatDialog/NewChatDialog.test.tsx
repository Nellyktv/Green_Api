import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { checkAccount } from '../../api/greenApi';
import { useAppStore } from '../../store/useAppStore';
import { useChatStore } from '../../store/useChatStore';
import { CHAT_ID, credentials } from '../../test/fixtures';
import { NewChatDialog } from './NewChatDialog';

vi.mock('../../api/greenApi', () => ({
  checkAccount: vi.fn(),
}));

const renderDialog = () => {
  const onClose = vi.fn();
  render(<NewChatDialog open credentials={credentials} onClose={onClose} />);
  return { onClose, user: userEvent.setup() };
};

describe('NewChatDialog', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useChatStore.setState({ chats: [], messages: {}, activeChatId: null });
    useAppStore.setState({ locale: 'ru' });
  });

  it('находит аккаунт по номеру, создаёт и открывает чат', async () => {
    vi.mocked(checkAccount).mockResolvedValue({ exist: true, chatId: CHAT_ID });
    const { onClose, user } = renderDialog();

    await user.type(screen.getByLabelText('Номер телефона или @username'), '+375 29 123-45-67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(checkAccount).toHaveBeenCalledWith(credentials, { phoneNumber: 375291234567 });
    expect(useChatStore.getState().chats).toEqual([{ chatId: CHAT_ID, name: '+375291234567' }]);
    expect(useChatStore.getState().activeChatId).toBe(CHAT_ID);
    expect(onClose).toHaveBeenCalled();
  });

  it('сообщает, если у номера нет аккаунта Telegram', async () => {
    vi.mocked(checkAccount).mockResolvedValue({ exist: false, chatId: '' });
    const { onClose, user } = renderDialog();

    await user.type(screen.getByLabelText('Номер телефона или @username'), '+375291234567');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(await screen.findByText('Аккаунт Telegram не найден')).toBeInTheDocument();
    expect(useChatStore.getState().chats).toEqual([]);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('не отправляет запрос, если номер введён неправильно', async () => {
    const { user } = renderDialog();

    await user.type(screen.getByLabelText('Номер телефона или @username'), '12345');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(screen.getByText('Введите номер в международном формате или @username')).toBeInTheDocument();
    expect(checkAccount).not.toHaveBeenCalled();
  });
});
