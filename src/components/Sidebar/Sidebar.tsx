import { useState } from 'react';
import { Box, IconButton, List, Stack, Tooltip, Typography } from '@mui/material';
import EditSquare from '@mui/icons-material/EditSquare';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import { chat } from '../../theme';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { NewChatDialog } from '../NewChatDialog/NewChatDialog';
import { ChatListItem } from './ChatListItem/ChatListItem';

interface Props {
  credentials: Credentials;
}

export const Sidebar = ({ credentials }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const chats = useChatStore((s) => s.chats);
  const messages = useChatStore((s) => s.messages);
  const activeChatId = useChatStore((s) => s.activeChatId);
  const selectChat = useChatStore((s) => s.selectChat);
  const logout = useAuthStore((s) => s.logout);
  const t = useTranslation();

  return (
    <Stack
      component='aside'
      sx={{
        width: { xs: '100%', md: chat.sidebarWidth },
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderRightWidth: { xs: 0, md: 1 },
        borderColor: 'divider',
      }}
    >
      <Stack direction='row' sx={{ alignItems: 'center', gap: 0.5, pt: 2, pr: 1.5, pb: 1.5, pl: 2.5 }}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant='h6'>{t.sidebar.title}</Typography>
          <Typography variant='caption'>
            {t.sidebar.instance} {credentials.idInstance}
          </Typography>
        </Box>
        <LanguageSwitch />
        <Tooltip title={t.sidebar.newChat}>
          <IconButton color='primary' onClick={() => setDialogOpen(true)} aria-label={t.sidebar.newChat}>
            <EditSquare />
          </IconButton>
        </Tooltip>
        <Tooltip title={t.sidebar.logout}>
          <IconButton onClick={logout} aria-label={t.sidebar.logout}>
            <LogoutRounded />
          </IconButton>
        </Tooltip>
      </Stack>

      {chats.length === 0 ? (
        <Typography variant='body2' sx={{ px: 3, py: 4, textAlign: 'center', color: 'text.secondary' }}>
          {t.sidebar.empty}
        </Typography>
      ) : (
        <List disablePadding sx={{ flex: 1, overflowY: 'auto', pb: 1 }}>
          {chats.map((el) => (
            <ChatListItem
              key={el.chatId}
              chat={el}
              lastMessage={messages[el.chatId]?.at(-1)}
              active={el.chatId === activeChatId}
              onSelect={selectChat}
            />
          ))}
        </List>
      )}

      <NewChatDialog open={dialogOpen} credentials={credentials} onClose={() => setDialogOpen(false)} />
    </Stack>
  );
};
