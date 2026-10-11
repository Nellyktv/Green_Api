import { Chip } from '@mui/material';
import { chat } from '../../theme';

interface Props {
  children: string;
}

export const ChatNotice = ({ children }: Props) => (
  <Chip label={children} sx={{ bgcolor: chat.noticeBg, color: 'common.white' }} />
);
