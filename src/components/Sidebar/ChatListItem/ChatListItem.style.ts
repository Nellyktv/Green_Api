import { alpha, type Theme } from '@mui/material';

export const chatItemSx = (theme: Theme) => ({
  gap: 1.5,
  mx: 1,
  px: 1.5,
  py: 1,
  borderRadius: 3,
  '&.Mui-selected': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
  '&.Mui-selected:hover': { bgcolor: alpha(theme.palette.primary.main, 0.14) },
});
