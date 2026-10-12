import { useState } from 'react';
import { Box, IconButton, List, Stack, Tooltip, Typography } from '@mui/material';
import EditSquare from '@mui/icons-material/EditSquare';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { NewChatDialog } from '../NewChatDialog/NewChatDialog';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { ChatListItem } from './ChatListItem/ChatListItem';
import { emptySx, headerSx, listSx, sidebarSx } from './sidebarStyles';

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
      sx={sidebarSx}
    >
      <Stack direction='row' sx={headerSx}>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant='h6'>{t.sidebar.title}</Typography>
          <Typography variant='caption'>
            {t.sidebar.instance} {credentials.idInstance}
          </Typography>
        </Box>
        <LanguageSwitch />
        <ThemeToggle />
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
        <Typography variant='body2' sx={emptySx}>
          {t.sidebar.empty}
        </Typography>
      ) : (
        <List disablePadding sx={listSx}>
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
