import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '../../test/render';
import userEvent from '@testing-library/user-event';
import { useAppStore } from '../../store/useAppStore';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'en', themeMode: 'light' });
  });

  it('offers the dark theme in light mode and switches to it on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: 'Dark theme' }));

    expect(useAppStore.getState().themeMode).toBe('dark');
    expect(screen.getByRole('button', { name: 'Light theme' })).toBeInTheDocument();
  });
});
