import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAppStore } from '../../../store/useAppStore';
import { MessageInput } from './MessageInput';

const renderInput = (onSend = vi.fn().mockResolvedValue(true)) => {
  render(<MessageInput onSend={onSend} />);
  return {
    onSend,
    user: userEvent.setup(),
    input: screen.getByRole('textbox', { name: 'Сообщение' }),
    button: screen.getByRole('button', { name: 'Отправить' }),
  };
};

describe('MessageInput', () => {
  beforeEach(() => {
    useAppStore.setState({ locale: 'ru' });
  });

  it('по Enter отправляет текст без лишних пробелов и очищает поле', async () => {
    const { onSend, user, input } = renderInput();

    await user.type(input, '  Привет  {Enter}');

    expect(onSend).toHaveBeenCalledWith('Привет');
    expect(input).toHaveValue('');
  });

  it('Shift+Enter переносит строку, а не отправляет', async () => {
    const { onSend, user, input } = renderInput();

    await user.type(input, 'Первая{Shift>}{Enter}{/Shift}Вторая');

    expect(onSend).not.toHaveBeenCalled();
    expect(input).toHaveValue('Первая\nВторая');
  });

  it('пустое сообщение отправить нельзя', async () => {
    const { onSend, user, input, button } = renderInput();

    await user.type(input, '   {Enter}');

    expect(button).toBeDisabled();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('отправляет по кнопке', async () => {
    const { onSend, user, input, button } = renderInput();

    await user.type(input, 'Привет');
    await user.click(button);

    expect(onSend).toHaveBeenCalledWith('Привет');
  });
});
