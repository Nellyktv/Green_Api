import { useState } from 'react';
import { IconButton, List, Tooltip } from '@mui/material';
import EditSquare from '@mui/icons-material/EditSquare';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { NewChatDialog } from '../NewChatDialog/NewChatDialog';
import { ChatListItem } from './ChatListItem/ChatListItem';
import styles from './Sidebar.module.scss';

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
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.title}>{t.sidebar.title}</div>
          <div className={styles.subtitle}>
            {t.sidebar.instance} {credentials.idInstance}
          </div>
        </div>
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
      </header>

      {chats.length === 0 ? (
        <div className={styles.empty}>{t.sidebar.empty}</div>
      ) : (
        <List className={styles.list} disablePadding>
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

      <NewChatDialog
        open={dialogOpen}
        credentials={credentials}
        onClose={() => setDialogOpen(false)}
      />
    </aside>
  );
};
