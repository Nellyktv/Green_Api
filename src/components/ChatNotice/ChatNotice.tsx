import { Chip } from '@mui/material';

interface Props {
  children: string;
}

export const ChatNotice = ({ children }: Props) => (
  <Chip label={children} sx={{ bgcolor: 'chat.noticeBg', color: 'common.white' }} />
);
