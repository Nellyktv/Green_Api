import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAppStore } from './store/useAppStore';
import { useAuthStore } from './store/useAuthStore';
import { credentials } from './test/fixtures';
import App from './App';

// vi.mock поднимается выше импортов, поэтому висящий запрос описан прямо здесь
vi.mock('./api/greenApi', () => ({
  receiveNotification: vi.fn(() => new Promise(() => {})),
}));

describe('App', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'ru' });
  });

  it('без данных инстанса показывает страницу входа', () => {
    useAuthStore.setState({ credentials: null });
    render(<App />);

    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('после входа показывает чаты', () => {
    useAuthStore.setState({ credentials });
    render(<App />);

    expect(screen.getByText('Чаты')).toBeInTheDocument();
    expect(screen.getByText('Выберите чат или создайте новый')).toBeInTheDocument();
  });
});
