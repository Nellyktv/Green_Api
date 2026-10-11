import { useMediaQuery, type Theme } from '@mui/material';
import { useNotifications } from '../../hooks/useNotifications';
import { useChatStore } from '../../store/useChatStore';
import type { Credentials } from '../../types';
import { Sidebar } from '../Sidebar/Sidebar';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { EmptyChat } from '../EmptyChat/EmptyChat';
import styles from './ChatPage.module.scss';

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

  // На телефоне места мало — показываем либо список чатов, либо открытый чат
  const showSidebar = !isMobile || !activeChat;
  const showChat = !isMobile || Boolean(activeChat);

  const handleBack = () => selectChat(null);

  return (
    <div className={styles.page}>
      {showSidebar && <Sidebar credentials={credentials} />}
      {showChat && (
        <main className={styles.main}>
          {activeChat ? (
            <ChatWindow
              key={activeChat.chatId}
              chat={activeChat}
              credentials={credentials}
              onBack={isMobile ? handleBack : undefined}
            />
          ) : (
            <EmptyChat />
          )}
        </main>
      )}
    </div>
  );
};
