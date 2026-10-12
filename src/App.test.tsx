import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from './test/render';
import { useAppStore } from './store/useAppStore';
import { useAuthStore } from './store/useAuthStore';
import { credentials } from './test/fixtures';
import App from './App';

// vi.mock is hoisted above the imports, so the hanging request is defined right here
vi.mock('./api/greenApi', () => ({
  receiveNotification: vi.fn(() => new Promise(() => {})),
}));

describe('App', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'en' });
  });

  it('shows the login page without instance data', () => {
    useAuthStore.setState({ credentials: null });
    render(<App />);

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows chats after signing in', () => {
    useAuthStore.setState({ credentials });
    render(<App />);

    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Select a chat or start a new one')).toBeInTheDocument();
  });
});
