import { formatTime } from '../../../lib/formatTime';
import { useAppStore } from '../../../store/useAppStore';
import type { Message } from '../../../types';
import styles from './MessageBubble.module.scss';

interface Props {
  message: Message;
}

export const MessageBubble = ({ message }: Props) => {
  const locale = useAppStore((s) => s.locale);
  const outgoing = message.type === 'outgoing';

  return (
    <div className={outgoing ? `${styles.row} ${styles.outgoing}` : styles.row}>
      <div className={styles.bubble}>
        <span className={styles.text}>{message.text}</span>
        <span className={styles.time}>{formatTime(message.timestamp, locale)}</span>
      </div>
    </div>
  );
};
