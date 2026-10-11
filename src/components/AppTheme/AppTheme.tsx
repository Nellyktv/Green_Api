import { type ReactNode } from 'react';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from './theme';

type AppThemeProps = { children: ReactNode };

// injectFirst puts MUI styles before ours, so SCSS modules can override them without !important
export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppTheme;
