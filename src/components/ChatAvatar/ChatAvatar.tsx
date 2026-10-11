import { Avatar } from '@mui/material';
import PersonRounded from '@mui/icons-material/PersonRounded';
import { getAvatarGradient, getInitials } from '../../lib/avatar';

interface Props {
  chatId: string;
  name: string;
  size?: number;
}

export const ChatAvatar = ({ chatId, name, size = 48 }: Props) => {
  const initials = getInitials(name);

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        background: getAvatarGradient(chatId),
        color: 'common.white',
        fontSize: Math.round(size * 0.38),
        fontWeight: 600,
      }}
    >
      {initials || <PersonRounded />}
    </Avatar>
  );
};
