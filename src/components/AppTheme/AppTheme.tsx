import { type ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useAppStore } from '../../store/useAppStore';
import { themes } from '../../theme';

type AppThemeProps = { children: ReactNode };

const AppTheme = ({ children }: AppThemeProps) => {
  const themeMode = useAppStore((s) => s.themeMode);

  return (
    <ThemeProvider theme={themes[themeMode]}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
