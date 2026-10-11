import { IconButton } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Chat } from '../../../types';
import { ChatAvatar } from '../../ChatAvatar/ChatAvatar';
import styles from './ChatHeader.module.scss';

interface Props {
  chat: Chat;
  onBack?: () => void;
}

export const ChatHeader = ({ chat, onBack }: Props) => {
  const t = useTranslation();

  return (
    <header className={styles.header}>
      {onBack && (
        <IconButton edge='start' onClick={onBack} aria-label={t.chat.back}>
          <ArrowBackRounded />
        </IconButton>
      )}
      <ChatAvatar chatId={chat.chatId} name={chat.name} size={40} />
      <div className={styles.info}>
        <div className={styles.name}>{chat.name}</div>
        <div className={styles.status}>Telegram</div>
      </div>
    </header>
  );
};
