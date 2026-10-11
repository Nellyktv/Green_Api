import { useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation';
import { chatBackgroundSx } from '../../../theme';
import type { Message } from '../../../types';
import { ChatNotice } from '../../ChatNotice/ChatNotice';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton';

interface Props {
  messages: Message[];
  loading: boolean;
}

export const MessageList = ({ messages, loading }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages.length]);

  const renderContent = () => {
    // The skeleton is only needed while there is nothing to show. If messages already exist, history loads silently
    if (messages.length === 0 && loading) return <MessageSkeleton />;
    if (messages.length === 0) return <ChatNotice>{t.chat.empty}</ChatNotice>;
    return messages.map((el) => <MessageBubble key={el.id} message={el} />);
  };

  return (
    <Stack
      ref={listRef}
      sx={{
        ...chatBackgroundSx,
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        gap: 0.75,
        px: { xs: 1.5, md: 3 },
        py: { xs: 1.5, md: 2 },
        // While there are few messages, stick them to the bottom, like in messengers
        '& > :first-child': { mt: 'auto' },
      }}
    >
      {renderContent()}
    </Stack>
  );
};
