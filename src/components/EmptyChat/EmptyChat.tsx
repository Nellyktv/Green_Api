import { Stack } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslation';
import { chatBackgroundSx } from '../../theme';
import { ChatNotice } from '../ChatNotice/ChatNotice';

export const EmptyChat = () => {
  const t = useTranslation();

  return (
    <Stack sx={{ ...chatBackgroundSx, flex: 1, alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <ChatNotice>{t.chat.select}</ChatNotice>
    </Stack>
  );
};
