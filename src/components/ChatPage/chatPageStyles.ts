import type { SxProps, Theme } from '@mui/material';

export const pageSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100dvh',
  overflow: 'hidden',
  bgcolor: 'background.default',
};

export const bodySx: SxProps<Theme> = { display: 'flex', flex: 1, minHeight: 0 };

export const mainSx: SxProps<Theme> = { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' };
