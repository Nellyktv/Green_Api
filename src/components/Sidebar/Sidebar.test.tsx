import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { CHAT_ID, createMessage, credentials } from '../../test/fixtures';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  beforeEach(() => {
    useAuthStore.setState({ credentials });
    useChatStore.setState({ chats: [], messages: {}, activeChatId: null });
    useAppStore.setState({ locale: 'en' });
  });

  it('hints what to do when there are no chats yet', () => {
    render(<Sidebar credentials={credentials} />);
    expect(screen.getByText(/No chats yet/)).toBeInTheDocument();
  });

  it('shows chats with the last message and opens a chat on click', async () => {
    useChatStore.getState().addMessage(createMessage({ text: 'Hello', type: 'outgoing' }), 'Vasilisa');
    const user = userEvent.setup();
    render(<Sidebar credentials={credentials} />);

    expect(screen.getByText('Vasilisa')).toBeInTheDocument();
    expect(screen.getByText('You: Hello')).toBeInTheDocument();

    await user.click(screen.getByText('Vasilisa'));
    expect(useChatStore.getState().activeChatId).toBe(CHAT_ID);
  });

  it('removes instance data and conversations on logout', async () => {
    useChatStore.getState().addMessage(createMessage(), 'Vasilisa');
    const user = userEvent.setup();
    render(<Sidebar credentials={credentials} />);

    await user.click(screen.getByRole('button', { name: 'Log out' }));

    expect(useAuthStore.getState().credentials).toBeNull();
    expect(useChatStore.getState().chats).toEqual([]);
  });
});
