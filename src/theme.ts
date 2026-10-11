import { createTheme } from '@mui/material';

// Chat-specific colors that have no slot in the MUI palette
export const chat = {
  sidebarWidth: 360,
  background: '#e9edf5',
  bubbleIn: '#ffffff',
  bubbleOut: '#dde6ff',
  accentGradient: 'linear-gradient(135deg, #6a5cff, #2fa8ff)',
  accentGradientHover: 'linear-gradient(135deg, #5a4cf0, #1f98f0)',
  loginBackdrop: 'linear-gradient(160deg, #a9c8ff, #8fd3e8)',
  loginCard: 'rgba(255, 255, 255, 0.72)',
  loginCardShadow: '0 12px 40px rgba(40, 90, 140, 0.18)',
};

// Message area background — light with a dotted pattern, like web.max.ru
export const chatBackgroundSx = {
  bgcolor: chat.background,
  backgroundImage: 'radial-gradient(rgba(61, 107, 255, 0.08) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

const textSecondary = 'rgba(0,0,0,0.6)';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f0f2f5', paper: '#ffffff' },
    primary: { main: '#3d6bff' },
    text: { primary: '#1a1c21', secondary: textSecondary },
    divider: 'rgba(0,0,0,0.08)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
    h6: { fontSize: 20, fontWeight: 700, lineHeight: 1.2 },
    subtitle1: { fontSize: 16, fontWeight: 600, lineHeight: 1.4 },
    subtitle2: { fontSize: 15, fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: 15, lineHeight: 1.4 },
    body2: { fontSize: 14, lineHeight: 1.4 },
    caption: { fontSize: 12, lineHeight: 1.4, color: textSecondary },
  },
  components: {
    MuiTextField: { defaultProps: { fullWidth: true } },
    MuiDialogActions: { styleOverrides: { root: { padding: '8px 24px 16px' } } },
    MuiListItemButton: {
      styleOverrides: { root: { gap: 12, margin: '0 8px', padding: '8px 12px', borderRadius: 36 } },
    },
  },
});
