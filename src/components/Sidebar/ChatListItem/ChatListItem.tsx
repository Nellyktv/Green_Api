import { ListItemButton } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslation';
import { formatTime } from '../../../lib/formatTime';
import { useAppStore } from '../../../store/useAppStore';
import type { Chat, Message } from '../../../types';
import { ChatAvatar } from '../../ChatAvatar/ChatAvatar';
import styles from './ChatListItem.module.scss';

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
    <ListItemButton selected={active} onClick={() => onSelect(chat.chatId)} className={styles.item}>
      <ChatAvatar chatId={chat.chatId} name={chat.name} />
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.name}>{chat.name}</span>
          {lastMessage && <span className={styles.time}>{formatTime(lastMessage.timestamp, locale)}</span>}
        </div>
        <div className={styles.preview}>{getPreview()}</div>
      </div>
    </ListItemButton>
  );
};
