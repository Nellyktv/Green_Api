import type { SxProps, Theme } from '@mui/material';
import { chatBackgroundSx } from '../../../theme';

export const listSx: SxProps<Theme> = {
  ...chatBackgroundSx,
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  gap: 0.75,
  px: { xs: 1.5, md: 3 },
  py: { xs: 1.5, md: 2 },
  // While there are few messages, stick them to the bottom, like in messengers
  '& > :first-child': { mt: 'auto' },
};
