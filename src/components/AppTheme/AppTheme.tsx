import { type ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../../theme';

type AppThemeProps = { children: ReactNode };

const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
