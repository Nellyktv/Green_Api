import type { CSSProperties } from 'react';
import { Avatar } from '@mui/material';
import PersonRounded from '@mui/icons-material/PersonRounded';
import { getAvatarGradient, getInitials } from '../../lib/avatar';
import styles from './ChatAvatar.module.scss';

interface Props {
  chatId: string;
  name: string;
  size?: number;
}

export const ChatAvatar = ({ chatId, name, size = 48 }: Props) => {
  const initials = getInitials(name);
  const style = { '--avatar-size': `${size}px`, background: getAvatarGradient(chatId) } as CSSProperties;

  return (
    <Avatar className={styles.avatar} style={style}>
      {initials || <PersonRounded />}
    </Avatar>
  );
};
