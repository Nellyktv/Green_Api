import { translations } from '../i18n/translations';
import { useAppStore } from '../store/useAppStore';

export const useTranslation = () => {
  const locale = useAppStore((s) => s.locale);
  return translations[locale];
};
