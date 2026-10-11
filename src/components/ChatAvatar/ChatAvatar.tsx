import { Avatar } from '@mui/material';
import PersonRounded from '@mui/icons-material/PersonRounded';
import { getAvatarGradient, getInitials } from '../../lib/avatar';
import { avatarSx } from './ChatAvatar.style';

interface Props {
  chatId: string;
  name: string;
  size?: number;
}

export const ChatAvatar = ({ chatId, name, size = 48 }: Props) => {
  const initials = getInitials(name);

  return (
    <Avatar sx={avatarSx(getAvatarGradient(chatId), size)}>
      {initials || <PersonRounded />}
    </Avatar>
  );
};
