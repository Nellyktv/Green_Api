import { Box, ListItemButton, Stack, Typography } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatTime } from '../../../lib/formatTime';
import { useAppStore } from '../../../store/useAppStore';
import type { Chat, Message } from '../../../types';
import { ChatAvatar } from '../../ChatAvatar/ChatAvatar';

interface Props {
  chat: Chat;
  lastMessage?: Message;
  active: boolean;
  onSelect: (chatId: string) => void;
}

export const ChatListItem = ({ chat, lastMessage, active, onSelect }: Props) => {
  const t = useTranslation();
  const locale = useAppStore((s) => s.locale);

  const getPreview = () => {
    if (!lastMessage) return t.sidebar.noMessages;
    return lastMessage.type === 'outgoing' ? `${t.sidebar.you}: ${lastMessage.text}` : lastMessage.text;
  };

  return (
    <ListItemButton selected={active} onClick={() => onSelect(chat.chatId)}>
      <ChatAvatar chatId={chat.chatId} name={chat.name} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Stack direction='row' sx={{ alignItems: 'baseline', gap: 1 }}>
          <Typography variant='subtitle2' component='div' noWrap sx={{ flexGrow: 1 }}>
            {chat.name}
          </Typography>
          {lastMessage && (
            <Typography variant='caption' sx={{ flexShrink: 0 }}>
              {formatTime(lastMessage.timestamp, locale)}
            </Typography>
          )}
        </Stack>
        <Typography variant='body2' component='div' noWrap sx={{ color: 'text.secondary' }}>
          {getPreview()}
        </Typography>
      </Box>
    </ListItemButton>
  );
};
