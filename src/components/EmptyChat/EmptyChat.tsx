import { useTranslation } from '../../hooks/useTranslation';
import styles from './EmptyChat.module.scss';

export const EmptyChat = () => {
  const t = useTranslation();

  return (
    <div className={styles.empty}>
      <span className={styles.badge}>{t.chat.select}</span>
    </div>
  );
};
