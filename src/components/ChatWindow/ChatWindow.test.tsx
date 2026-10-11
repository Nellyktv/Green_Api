import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getChatHistory, sendMessage } from '../../api/greenApi';
import { useAppStore } from '../../store/useAppStore';
import { useChatStore } from '../../store/useChatStore';
import type { HistoryMessage } from '../../types';
import { CHAT_ID, createHistoryMessage, createMessage, credentials } from '../../test/fixtures';
import { ChatWindow } from './ChatWindow';

vi.mock('../../api/greenApi', () => ({
  getChatHistory: vi.fn(),
  sendMessage: vi.fn(),
}));

const chat = { chatId: CHAT_ID, name: 'Vasilisa' };

describe('ChatWindow', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getChatHistory).mockResolvedValue([]);
    useChatStore.setState({ chats: [chat], messages: {}, activeChatId: CHAT_ID });
    useAppStore.setState({ locale: 'en' });
  });

  it('shows a skeleton while history loads, then its messages', async () => {
    let resolveHistory: (history: HistoryMessage[]) => void = () => {};
    vi.mocked(getChatHistory).mockReturnValue(new Promise((resolve) => (resolveHistory = resolve)));

    render(<ChatWindow chat={chat} credentials={credentials} />);
    expect(screen.getByTestId('message-skeleton')).toBeInTheDocument();

    await act(async () => resolveHistory([createHistoryMessage({ textMessage: 'How are you?' })]));

    expect(screen.getByText('How are you?')).toBeInTheDocument();
    expect(screen.queryByTestId('message-skeleton')).not.toBeInTheDocument();
  });

  it('sends a message on Enter and shows it in the chat', async () => {
    vi.mocked(sendMessage).mockResolvedValue({ idMessage: 'sent-1' });
    const user = userEvent.setup();
    render(<ChatWindow chat={chat} credentials={credentials} />);

    const input = screen.getByRole('textbox', { name: 'Message' });
    await user.type(input, 'Hello!{Enter}');

    expect(sendMessage).toHaveBeenCalledWith(credentials, CHAT_ID, 'Hello!');
    expect(await screen.findByText('Hello!')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('shows an error and keeps the text when sending fails', async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error('Network Error'));
    const user = userEvent.setup();
    render(<ChatWindow chat={chat} credentials={credentials} />);

    const input = screen.getByRole('textbox', { name: 'Message' });
    await user.type(input, 'Hello!{Enter}');

    expect(await screen.findByText('Could not send the message')).toBeInTheDocument();
    expect(input).toHaveValue('Hello!');
  });

  it('immediately shows the reply that arrived through notifications', async () => {
    render(<ChatWindow chat={chat} credentials={credentials} />);
    await waitFor(() => expect(screen.queryByTestId('message-skeleton')).not.toBeInTheDocument());

    act(() => useChatStore.getState().addMessage(createMessage({ text: 'Reply from Telegram' })));

    expect(screen.getByText('Reply from Telegram')).toBeInTheDocument();
  });
});
