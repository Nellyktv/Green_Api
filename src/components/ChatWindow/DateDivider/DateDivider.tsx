import { Chip } from '@mui/material';

interface Props {
  label: string;
}

export const DateDivider = ({ label }: Props) => (
  <Chip label={label} size='small' sx={{ alignSelf: 'center', bgcolor: 'chat.dividerBg', color: 'text.secondary' }} />
);
