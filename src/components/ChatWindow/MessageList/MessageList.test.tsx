import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAppStore } from '../../../store/useAppStore';
import { createMessage } from '../../../test/fixtures';
import { MessageList } from './MessageList';

const at = (day: number, hour: number) => new Date(2026, 5, day, hour).getTime();

describe('MessageList', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 5, 15, 12));
    useAppStore.setState({ locale: 'en' });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows one divider per day, including before the first message', () => {
    const messages = [
      createMessage({ id: '1', timestamp: at(14, 9) }),
      createMessage({ id: '2', timestamp: at(14, 18) }),
      createMessage({ id: '3', timestamp: at(15, 8) }),
    ];
    render(<MessageList messages={messages} loading={false} />);

    expect(screen.getAllByText('Yesterday')).toHaveLength(1);
    expect(screen.getAllByText('Today')).toHaveLength(1);
  });
});
