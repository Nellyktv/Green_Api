import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../test/render';
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
    useAppStore.setState({ locale: 'en' });
  });

  it('finds the account by number, creates and opens the chat', async () => {
    vi.mocked(checkAccount).mockResolvedValue({ exist: true, chatId: CHAT_ID });
    const { onClose, user } = renderDialog();

    await user.type(screen.getByLabelText('Phone number or @username'), '+375 29 123-45-67');
    await user.click(screen.getByRole('button', { name: 'Create chat' }));

    expect(checkAccount).toHaveBeenCalledWith(credentials, { phoneNumber: 375291234567 });
    expect(useChatStore.getState().chats).toEqual([{ chatId: CHAT_ID, name: '+375291234567' }]);
    expect(useChatStore.getState().activeChatId).toBe(CHAT_ID);
    expect(onClose).toHaveBeenCalled();
  });

  it('reports when the number has no Telegram account', async () => {
    vi.mocked(checkAccount).mockResolvedValue({ exist: false, chatId: '' });
    const { onClose, user } = renderDialog();

    await user.type(screen.getByLabelText('Phone number or @username'), '+375291234567');
    await user.click(screen.getByRole('button', { name: 'Create chat' }));

    expect(await screen.findByText('Telegram account not found')).toBeInTheDocument();
    expect(useChatStore.getState().chats).toEqual([]);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not send a request when the number is invalid', async () => {
    const { user } = renderDialog();

    await user.type(screen.getByLabelText('Phone number or @username'), '12345');
    await user.click(screen.getByRole('button', { name: 'Create chat' }));

    expect(screen.getByText('Enter a number in international format or a @username')).toBeInTheDocument();
    expect(checkAccount).not.toHaveBeenCalled();
  });
});
