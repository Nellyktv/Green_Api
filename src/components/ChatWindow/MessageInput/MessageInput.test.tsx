import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../../test/render';
import userEvent from '@testing-library/user-event';
import { useAppStore } from '../../../store/useAppStore';
import { MessageInput } from './MessageInput';

const renderInput = (onSend = vi.fn().mockResolvedValue(true)) => {
  render(<MessageInput onSend={onSend} />);
  return {
    onSend,
    user: userEvent.setup(),
    input: screen.getByRole('textbox', { name: 'Message' }),
    button: screen.getByRole('button', { name: 'Send' }),
  };
};

describe('MessageInput', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'en' });
  });

  it('sends trimmed text on Enter and clears the field', async () => {
    const { onSend, user, input } = renderInput();

    await user.type(input, '  Hello  {Enter}');

    expect(onSend).toHaveBeenCalledWith('Hello');
    expect(input).toHaveValue('');
  });

  it('Shift+Enter adds a new line instead of sending', async () => {
    const { onSend, user, input } = renderInput();

    await user.type(input, 'First{Shift>}{Enter}{/Shift}Second');

    expect(onSend).not.toHaveBeenCalled();
    expect(input).toHaveValue('First\nSecond');
  });

  it('an empty message cannot be sent', async () => {
    const { onSend, user, input, button } = renderInput();

    await user.type(input, '   {Enter}');

    expect(button).toBeDisabled();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends on button click', async () => {
    const { onSend, user, input, button } = renderInput();

    await user.type(input, 'Hello');
    await user.click(button);

    expect(onSend).toHaveBeenCalledWith('Hello');
  });
});
