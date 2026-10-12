import type { SxProps, Theme } from '@mui/material';

export const headerSx: SxProps<Theme> = {
  alignItems: 'center',
  gap: { xs: 1, md: 1.5 },
  minHeight: { xs: 56, md: 64 },
  px: { xs: 1.5, md: 2.5 },
  py: { xs: 1, md: 1.25 },
  bgcolor: 'background.paper',
  borderBottom: 1,
  borderColor: 'divider',
};
