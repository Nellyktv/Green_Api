import { Alert } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import { useConnectionStore } from '../../store/useConnectionStore';

export const ConnectionBanner = () => {
  const t = useTranslation();
  const online = useConnectionStore((s) => s.online);

  if (online) return null;

  return (
    <Alert severity='warning' variant='standard' role='status' sx={{ borderRadius: 0 }}>
      {t.status.offline}
    </Alert>
  );
};
