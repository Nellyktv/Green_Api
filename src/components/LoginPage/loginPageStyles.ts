import type { SxProps, Theme } from '@mui/material';
import { accentGradient } from '../../tokens';

// Theme-dependent values live in a separate sx item: mixing them with responsive objects in one function breaks the breakpoints
export const pageSx: SxProps<Theme> = [
  {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: { xs: 'flex-start', md: 'center' },
    justifyContent: 'center',
    p: { xs: 0, md: 2 },
    bgcolor: 'background.paper',
  },
  (theme) => ({ [theme.breakpoints.up('md')]: { background: theme.palette.chat.loginBackdrop } }),
];

export const cardSx: SxProps<Theme> = [
  {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    width: '100%',
    maxWidth: { md: 420 },
    p: { xs: '24px 16px', md: '32px 28px' },
    bgcolor: { xs: 'background.paper', md: 'chat.loginCard' },
    backdropFilter: { md: 'blur(16px)' },
    boxShadow: 'none',
    borderRadius: { xs: 0, md: '28px' },
  },
  (theme) => ({ [theme.breakpoints.up('md')]: { boxShadow: theme.palette.chat.loginCardShadow } }),
];

export const languageSwitchSx: SxProps<Theme> = { position: 'absolute', top: 12, left: 12 };

export const topRightSx: SxProps<Theme> = { position: 'absolute', top: 12, right: 12, display: 'flex' };

export const headerSx: SxProps<Theme> = { alignItems: 'center', gap: 0.5, mt: 4, mb: 1, textAlign: 'center' };

export const avatarSx: SxProps<Theme> = { width: 64, height: 64, mb: 1, background: accentGradient, color: 'common.white' };

export const fullWidthSx: SxProps<Theme> = { width: '100%' };

export const advancedFieldSx: SxProps<Theme> = { pt: 1 };

export const hintSx: SxProps<Theme> = { textAlign: 'center' };
