import { Box, Typography } from '@mui/material';
import { formatTime } from '../../../lib/formatTime';
import { useAppStore } from '../../../store/useAppStore';
import { chat } from '../../../theme';
import type { Message } from '../../../types';

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => {
  const locale = useAppStore((s) => s.locale);
  const outgoing = message.type === 'outgoing';

  return (
    <Box sx={{ display: 'flex', justifyContent: outgoing ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          maxWidth: { xs: '85%', md: 'min(70%, 560px)' },
          px: 1.5,
          py: 0.75,
          borderRadius: outgoing ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          bgcolor: outgoing ? chat.bubbleOut : chat.bubbleIn,
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
        }}
      >
        <Typography component='span'>{message.text}</Typography>
        <Typography
          component='span'
          variant='caption'
          sx={{ float: 'right', mt: 0.5, mb: -0.5, ml: 1.5 }}
        >
          {formatTime(message.timestamp, locale)}
        </Typography>
      </Box>
    </Box>
  );
};
