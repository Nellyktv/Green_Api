import { Box, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Chat } from '../../../types';
import { ChatAvatar } from '../../ChatAvatar/ChatAvatar';

interface Props {
  chat: Chat;
  onBack?: () => void;
}

export const ChatHeader = ({ chat, onBack }: Props) => {
  const t = useTranslation();

  return (
    <Stack
      component='header'
      direction='row'
      sx={{
        alignItems: 'center',
        gap: { xs: 1, md: 1.5 },
        minHeight: { xs: 56, md: 64 },
        px: { xs: 1.5, md: 2.5 },
        py: { xs: 1, md: 1.25 },
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      {onBack && (
        <IconButton edge='start' onClick={onBack} aria-label={t.chat.back}>
          <ArrowBackRounded />
        </IconButton>
      )}
      <ChatAvatar chatId={chat.chatId} name={chat.name} size={40} />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant='subtitle1' component='div' noWrap>
          {chat.name}
        </Typography>
        <Typography variant='caption'>
          Telegram
        </Typography>
      </Box>
    </Stack>
  );
};
