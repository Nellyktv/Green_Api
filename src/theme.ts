import { createTheme, type Theme } from '@mui/material';
import type { ThemeMode } from './types';

// Chat-specific values that have no slot in the MUI palette, defined per color mode
interface ChatPalette {
  background: string;
  dots: string;
  bubbleIn: string;
  bubbleOut: string;
  bubbleShadow: string;
  noticeBg: string;
  dividerBg: string;
  loginBackdrop: string;
  loginCard: string;
  loginCardShadow: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    chat: ChatPalette;
  }
  interface PaletteOptions {
    chat?: ChatPalette;
  }
}

// Message area background — a flat color with a dotted pattern, like web.max.ru
export const chatBackgroundSx = {
  bgcolor: 'chat.background',
  backgroundImage: (theme: Theme) => `radial-gradient(${theme.palette.chat.dots} 1px, transparent 1px)`,
  backgroundSize: '18px 18px',
};

const palettes = {
  light: {
    background: { default: '#f0f2f5', paper: '#ffffff' },
    primary: { main: '#3d6bff' },
    text: { primary: '#1a1c21', secondary: 'rgba(0,0,0,0.6)' },
    divider: 'rgba(0,0,0,0.08)',
    chat: {
      background: '#e9edf5',
      dots: 'rgba(61, 107, 255, 0.08)',
      bubbleIn: '#ffffff',
      bubbleOut: '#dde6ff',
      bubbleShadow: '0 1px 1px rgba(0, 0, 0, 0.06)',
      noticeBg: 'rgba(0, 0, 0, 0.35)',
      dividerBg: 'rgba(255, 255, 255, 0.8)',
      loginBackdrop: 'linear-gradient(160deg, #a9c8ff, #8fd3e8)',
      loginCard: 'rgba(255, 255, 255, 0.72)',
      loginCardShadow: '0 12px 40px rgba(40, 90, 140, 0.18)',
    },
  },
  dark: {
    background: { default: '#0e1117', paper: '#161b22' },
    primary: { main: '#5f82ff' },
    text: { primary: '#e6e8ee', secondary: 'rgba(255,255,255,0.62)' },
    divider: 'rgba(255,255,255,0.1)',
    chat: {
      background: '#0d1219',
      dots: 'rgba(130, 160, 255, 0.07)',
      bubbleIn: '#1f2630',
      bubbleOut: '#27407f',
      bubbleShadow: 'none',
      noticeBg: 'rgba(0, 0, 0, 0.45)',
      dividerBg: 'rgba(255, 255, 255, 0.1)',
      loginBackdrop: 'linear-gradient(160deg, #18213a, #0f2b33)',
      loginCard: 'rgba(22, 27, 34, 0.75)',
      loginCardShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
    },
  },
};

const createAppTheme = (mode: ThemeMode) =>
  createTheme({
    palette: { mode, ...palettes[mode] },
    shape: { borderRadius: 12 },
    typography: (palette) => ({
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
      h6: { fontSize: 20, fontWeight: 700, lineHeight: 1.2 },
      subtitle1: { fontSize: 16, fontWeight: 600, lineHeight: 1.4 },
      subtitle2: { fontSize: 15, fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: 15, lineHeight: 1.4 },
      body2: { fontSize: 14, lineHeight: 1.4 },
      caption: { fontSize: 12, lineHeight: 1.4, color: palette.text.secondary },
    }),
    components: {
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiChip: { styleOverrides: { root: { fontWeight: 500 } } },
      MuiFab: { styleOverrides: { root: { boxShadow: 'none', '&:active': { boxShadow: 'none' } } } },
      MuiDialogActions: { styleOverrides: { root: { padding: '8px 24px 16px' } } },
      MuiListItemButton: {
        styleOverrides: { root: { gap: 12, margin: '0 8px', padding: '8px 12px', borderRadius: 36 } },
      },
    },
  });

export const themes = { light: createAppTheme('light'), dark: createAppTheme('dark') };
