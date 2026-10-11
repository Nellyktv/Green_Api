import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getStateInstance } from '../../api/greenApi';
import { DEFAULT_API_URL } from '../../lib/credentials';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../store/useAuthStore';
import { LoginPage } from './LoginPage';

vi.mock('../../api/greenApi', () => ({
  getStateInstance: vi.fn(),
}));

const fillForm = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('idInstance'), '4100000001');
  await user.type(screen.getByLabelText('apiTokenInstance'), 'token123');
  return user;
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    useAuthStore.setState({ credentials: null });
    useAppStore.setState({ locale: 'en' });
  });

  it('the sign-in button is disabled until idInstance and apiTokenInstance are filled', async () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();

    await fillForm();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeEnabled();
  });

  it('signs in when an account is linked to the instance', async () => {
    vi.mocked(getStateInstance).mockResolvedValue({ stateInstance: 'authorized' });
    render(<LoginPage />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    const expected = { idInstance: '4100000001', apiTokenInstance: 'token123', apiUrl: DEFAULT_API_URL };
    expect(getStateInstance).toHaveBeenCalledWith(expected);
    expect(useAuthStore.getState().credentials).toEqual(expected);
  });

  it('does not sign in when the instance is not authorized and explains why', async () => {
    vi.mocked(getStateInstance).mockResolvedValue({ stateInstance: 'notAuthorized' });
    render(<LoginPage />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('notAuthorized');
    expect(useAuthStore.getState().credentials).toBeNull();
  });

  it('shows an error when the data is wrong or the server is unavailable', async () => {
    vi.mocked(getStateInstance).mockRejectedValue(new Error('Request failed with status code 401'));
    render(<LoginPage />);

    const user = await fillForm();
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not connect');
    expect(useAuthStore.getState().credentials).toBeNull();
  });

  it('switches the interface language', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(useAppStore.getState().locale).toBe('en');
  });
});
