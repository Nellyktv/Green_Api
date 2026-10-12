import { IconButton, Stack, Typography } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Chat } from '../../../types';
import { ChatAvatar } from '../../ChatAvatar/ChatAvatar';
import { headerSx } from './chatHeaderStyles';

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
      sx={headerSx}
    >
      {onBack && (
        <IconButton edge='start' onClick={onBack} aria-label={t.chat.back}>
          <ArrowBackRounded />
        </IconButton>
      )}
      <ChatAvatar chatId={chat.chatId} name={chat.name} size={40} />
      <Typography variant='subtitle1' component='div' noWrap>
        {chat.name}
      </Typography>
    </Stack>
  );
};
