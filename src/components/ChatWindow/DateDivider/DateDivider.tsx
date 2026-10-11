import { Chip } from '@mui/material';

interface Props {
  label: string;
}

export const DateDivider = ({ label }: Props) => (
  <Chip
    label={label}
    size="small"
    sx={{ alignSelf: 'center', bgcolor: 'rgba(255, 255, 255, 0.8)', color: 'text.secondary', fontWeight: 500 }}
  />
);
