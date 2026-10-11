import { Chip } from '@mui/material';

interface Props {
  children: string;
}

export const ChatNotice = ({ children }: Props) => (
  <Chip label={children} sx={{ bgcolor: 'rgba(0, 0, 0, 0.35)', color: 'common.white', fontWeight: 500 }} />
);
