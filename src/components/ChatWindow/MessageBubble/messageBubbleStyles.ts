import type { SxProps, Theme } from '@mui/material';
import { chat } from '../../../theme';

export const rowSx = (outgoing: boolean): SxProps<Theme> => ({
  display: 'flex',
  justifyContent: outgoing ? 'flex-end' : 'flex-start',
});

export const bubbleSx = (outgoing: boolean): SxProps<Theme> => ({
  maxWidth: { xs: '85%', md: 'min(70%, 560px)' },
  px: 1.5,
  py: 0.75,
  borderRadius: outgoing ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
  bgcolor: outgoing ? chat.bubbleOut : chat.bubbleIn,
  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
});

export const timeSx: SxProps<Theme> = { float: 'right', mt: 0.5, mb: -0.5, ml: 1.5 };
