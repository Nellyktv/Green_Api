import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import AppTheme from '../components/AppTheme/AppTheme';

export * from '@testing-library/react';

// Components read palette.chat from the theme, so tests render them inside it like the app does
export const renderWithTheme = (ui: ReactElement) => render(ui, { wrapper: AppTheme });
export { renderWithTheme as render };
