import { Box, useMediaQuery, type Theme } from '@mui/material';
import { useNotifications } from '../../hooks/useNotifications';
import { useChatStore } from '../../store/useChatStore';
import type { Credentials } from '../../types';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { EmptyChat } from '../EmptyChat/EmptyChat';

interface Props {
  credentials: Credentials;
}

export const ChatPage = ({ credentials }: Props) => {
  useNotifications(credentials);

  const chats = useChatStore((s) => s.chats);
  const activeChatId = useChatStore((s) => s.activeChatId);
  const selectChat = useChatStore((s) => s.selectChat);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const activeChat = chats.find((el) => el.chatId === activeChatId);

  const showSidebar = !isMobile || !activeChat;
  const showChat = !isMobile || Boolean(activeChat);

  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden', bgcolor: 'background.default' }}>
      {showSidebar && <Sidebar credentials={credentials} />}
      {showChat && (
        <Box component='main' sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {activeChat ? (
            <ChatWindow
              key={activeChat.chatId}
              chat={activeChat}
              credentials={credentials}
              onBack={isMobile ? () => selectChat(null) : undefined}
            />
          ) : (
            <EmptyChat />
          )}
        </Box>
      )}
    </Box>
  );
};
