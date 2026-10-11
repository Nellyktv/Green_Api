import type { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { languages } from '../../i18n/translations';
import { useTranslation } from '../../hooks/useTranslation';
import { useAppStore } from '../../store/useAppStore';
import type { Locale } from '../../types';
import { toggleGroupSx } from './LanguageSwitch.style';

export const LanguageSwitch = () => {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const t = useTranslation();

  const handleChange = (_e: MouseEvent<HTMLElement>, next: Locale | null) => {
    if (next) setLocale(next);
  };

  return (
    <ToggleButtonGroup
      size='small'
      exclusive
      value={locale}
      onChange={handleChange}
      aria-label={t.language}
      sx={toggleGroupSx}
    >
      {languages.map((el) => (
        <ToggleButton key={el.value} value={el.value}>
          {el.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
