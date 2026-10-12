import { IconButton, Tooltip } from '@mui/material';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/useAppStore';

export const ThemeToggle = () => {
  const themeMode = useAppStore((s) => s.themeMode);
  const toggleThemeMode = useAppStore((s) => s.toggleThemeMode);
  const t = useTranslation();

  const dark = themeMode === 'dark';
  const label = dark ? t.theme.toLight : t.theme.toDark;

  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} onClick={toggleThemeMode}>
        {dark ? <LightModeRounded /> : <DarkModeRounded />}
      </IconButton>
    </Tooltip>
  );
};
