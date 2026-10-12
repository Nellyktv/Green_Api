import type { SxProps, Theme } from '@mui/material';

export const avatarSx = (size: number, background: string): SxProps<Theme> => ({
  width: size,
  height: size,
  flexShrink: 0,
  background,
  color: 'common.white',
  fontWeight: 600,
});
