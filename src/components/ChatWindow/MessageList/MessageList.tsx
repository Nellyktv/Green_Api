import { useEffect, useRef } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import type { Message } from '../../../types';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { MessageSkeleton } from '../MessageSkeleton/MessageSkeleton';
import styles from './MessageList.module.scss';

interface Props {
  messages: Message[];
  loading: boolean;
}

export const MessageList = ({ messages, loading }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  // Новое сообщение — прокручиваем к нему
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages.length]);

  const renderContent = () => {
    // Скелетон нужен, только пока нечего показать. Если сообщения уже есть — история догрузится тихо
    if (messages.length === 0 && loading) return <MessageSkeleton />;
    if (messages.length === 0) return <div className={styles.empty}>{t.chat.empty}</div>;
    return messages.map((el) => <MessageBubble key={el.id} message={el} />);
  };

  return (
    <div ref={listRef} className={styles.list}>
      {renderContent()}
    </div>
  );
};
