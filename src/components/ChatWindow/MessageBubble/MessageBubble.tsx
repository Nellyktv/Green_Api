import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { formatTime } from '../../../lib/formatTime';
import { useAppStore } from '../../../store/useAppStore';
import type { Message } from '../../../types';
import { bubbleSx, rowSx, timeSx } from './messageBubbleStyles';

interface Props {
  message: Message;
}

export const MessageBubble = memo(function MessageBubble({ message }: Props) {
  const locale = useAppStore((s) => s.locale);
  const outgoing = message.type === 'outgoing';

  return (
    <Box sx={rowSx(outgoing)}>
      <Box sx={bubbleSx(outgoing)}>
        <Typography component='span'>{message.text}</Typography>
        <Typography component='span' variant='caption' sx={timeSx}>
          {formatTime(message.timestamp, locale)}
        </Typography>
      </Box>
    </Box>
  );
});
