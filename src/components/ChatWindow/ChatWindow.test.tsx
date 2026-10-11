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
    useAppStore.setState({ locale: 'ru' });
  });

  it('показывает скелетон, пока грузится история, а потом сообщения из неё', async () => {
    let resolveHistory: (history: HistoryMessage[]) => void = () => {};
    vi.mocked(getChatHistory).mockReturnValue(new Promise((resolve) => (resolveHistory = resolve)));

    render(<ChatWindow chat={chat} credentials={credentials} />);
    expect(screen.getByTestId('message-skeleton')).toBeInTheDocument();

    await act(async () => resolveHistory([createHistoryMessage({ textMessage: 'Как дела?' })]));

    expect(screen.getByText('Как дела?')).toBeInTheDocument();
    expect(screen.queryByTestId('message-skeleton')).not.toBeInTheDocument();
  });

  it('отправляет сообщение по Enter и показывает его в чате', async () => {
    vi.mocked(sendMessage).mockResolvedValue({ idMessage: 'sent-1' });
    const user = userEvent.setup();
    render(<ChatWindow chat={chat} credentials={credentials} />);

    const input = screen.getByRole('textbox', { name: 'Сообщение' });
    await user.type(input, 'Привет!{Enter}');

    expect(sendMessage).toHaveBeenCalledWith(credentials, CHAT_ID, 'Привет!');
    expect(await screen.findByText('Привет!')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('если отправить не вышло — показывает ошибку и не стирает текст', async () => {
    vi.mocked(sendMessage).mockRejectedValue(new Error('Network Error'));
    const user = userEvent.setup();
    render(<ChatWindow chat={chat} credentials={credentials} />);

    const input = screen.getByRole('textbox', { name: 'Сообщение' });
    await user.type(input, 'Привет!{Enter}');

    expect(await screen.findByText('Не удалось отправить сообщение')).toBeInTheDocument();
    expect(input).toHaveValue('Привет!');
  });

  it('сразу показывает ответ собеседника, пришедший через уведомления', async () => {
    render(<ChatWindow chat={chat} credentials={credentials} />);
    await waitFor(() => expect(screen.queryByTestId('message-skeleton')).not.toBeInTheDocument());

    act(() => useChatStore.getState().addMessage(createMessage({ text: 'Ответ из Telegram' })));

    expect(screen.getByText('Ответ из Telegram')).toBeInTheDocument();
  });
});
