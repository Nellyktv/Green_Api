import type { SxProps, Theme } from '@mui/material';

const SIDEBAR_WIDTH = 360;

export const sidebarSx: SxProps<Theme> = {
  width: { xs: '100%', md: SIDEBAR_WIDTH },
  flexShrink: 0,
  bgcolor: 'background.paper',
  borderRight: 1,
  borderRightWidth: { xs: 0, md: 1 },
  borderColor: 'divider',
};

export const headerSx: SxProps<Theme> = { alignItems: 'center', gap: 0.5, pt: 2, pr: 1.5, pb: 1.5, pl: 2.5 };

export const emptySx: SxProps<Theme> = { px: 3, py: 4, textAlign: 'center', color: 'text.secondary' };

export const listSx: SxProps<Theme> = { flex: 1, overflowY: 'auto', pb: 1 };
