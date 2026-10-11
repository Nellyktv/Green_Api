import { Fragment, useEffect, useRef } from 'react';
import { Stack } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatDayLabel, getDayKey } from '../../../lib/formatDate';
import { useAppStore } from '../../../store/useAppStore';
import { chatBackgroundSx } from '../../../theme';
import type { Message } from '../../../types';
import { ChatNotice } from '../../ChatNotice/ChatNotice';
import { DateDivider } from '../DateDivider/DateDivider';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton';

const NEAR_BOTTOM_PX = 120;

interface Props {
  messages: Message[];
  loading: boolean;
}

export const MessageList = ({ messages, loading }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);
  // Tracked on scroll, because by the time the effect runs the new message has already grown the list
  const nearBottomRef = useRef(true);
  const t = useTranslation();
  const locale = useAppStore((s) => s.locale);

  const handleScroll = () => {
    const list = listRef.current;
    if (list) nearBottomRef.current = list.scrollHeight - list.scrollTop - list.clientHeight <= NEAR_BOTTOM_PX;
  };

  const count = messages.length;
  const lastType = messages[count - 1]?.type;

  useEffect(() => {
    const list = listRef.current;
    const wasEmpty = prevCountRef.current === 0;
    prevCountRef.current = count;
    if (list && count > 0 && (wasEmpty || lastType === 'outgoing' || nearBottomRef.current)) {
      list.scrollTop = list.scrollHeight;
    }
  }, [count, lastType]);

  const renderContent = () => {
    // The skeleton is only needed while there is nothing to show. If messages already exist, history loads silently
    if (messages.length === 0 && loading) return <MessageSkeleton />;
    if (messages.length === 0) return <ChatNotice>{t.chat.empty}</ChatNotice>;
    return messages.map((el, i) => (
      <Fragment key={el.id}>
        {(i === 0 || getDayKey(messages[i - 1].timestamp) !== getDayKey(el.timestamp)) && (
          <DateDivider label={formatDayLabel(el.timestamp, locale, t.chat)} />
        )}
        <MessageBubble message={el} />
      </Fragment>
    ));
  };

  return (
    <Stack
      ref={listRef}
      onScroll={handleScroll}
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
