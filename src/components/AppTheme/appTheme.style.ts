import { createTheme } from '@mui/material';

export const ACCENT_GRADIENT = 'linear-gradient(135deg, #6a5cff, #2fa8ff)';
export const ACCENT_GRADIENT_HOVER = 'linear-gradient(135deg, #5a4cf0, #1f98f0)';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#f0f2f5', paper: '#ffffff' },
    primary: { main: '#3d6bff' },
    text: { primary: '#1a1c21', secondary: 'rgba(0,0,0,0.5)' },
    divider: 'rgba(0,0,0,0.08)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
});
