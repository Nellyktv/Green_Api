import type { SxProps, Theme } from '@mui/material';

export const formSx: SxProps<Theme> = {
  alignItems: 'flex-end',
  gap: 1,
  px: { xs: 1, md: 2.5 },
  pt: { xs: 1, md: 1.5 },
  pb: { xs: 'calc(8px + env(safe-area-inset-bottom))', md: 1.5 },
  bgcolor: 'background.paper',
  borderTop: 1,
  borderColor: 'divider',
};

export const inputSx: SxProps<Theme> = {
  px: 2,
  py: 1.25,
  bgcolor: 'background.default',
  borderRadius: 5,
  fontSize: { xs: 16, md: 15 },
};
