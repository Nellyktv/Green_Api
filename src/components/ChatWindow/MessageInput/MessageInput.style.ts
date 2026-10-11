import { ACCENT_GRADIENT, ACCENT_GRADIENT_HOVER } from '../../AppTheme/appTheme.style';

export const inputSx = {
  px: 2,
  py: 1.25,
  bgcolor: 'background.default',
  borderRadius: 5,
  fontSize: { xs: 16, md: 15 },
  lineHeight: 1.4,
};

export const sendButtonSx = {
  width: 44,
  height: 44,
  flexShrink: 0,
  color: '#fff',
  background: ACCENT_GRADIENT,
  '&:hover': { background: ACCENT_GRADIENT_HOVER },
  '&.Mui-disabled': { color: '#fff', background: ACCENT_GRADIENT, opacity: 0.45 },
};
