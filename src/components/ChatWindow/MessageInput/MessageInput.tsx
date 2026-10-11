import { useState, type KeyboardEvent, type SubmitEvent } from 'react';
import { CircularProgress, Fab, InputBase, Stack } from '@mui/material';
import SendRounded from '@mui/icons-material/SendRounded';
import { useTranslation } from '../../../hooks/useTranslation';

const MAX_MESSAGE_LENGTH = 4096;

interface Props {
  onSend: (text: string) => Promise<boolean>;
}

export const MessageInput = ({ onSend }: Props) => {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const t = useTranslation();

  const canSend = text.trim() !== '' && !sending;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    const sent = await onSend(text.trim());
    setSending(false);
    if (sent) setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSend();
  };

  return (
    <Stack
      component='form'
      direction='row'
      onSubmit={handleSubmit}
      sx={{
        alignItems: 'flex-end',
        gap: 1,
        px: { xs: 1, md: 2.5 },
        pt: { xs: 1, md: 1.5 },
        pb: { xs: 'calc(8px + env(safe-area-inset-bottom))', md: 1.5 },
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <InputBase
        multiline
        maxRows={6}
        fullWidth
        autoFocus
        placeholder={t.chat.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{ input: { maxLength: MAX_MESSAGE_LENGTH, 'aria-label': t.chat.placeholder } }}
        sx={{
          px: 2,
          py: 1.25,
          bgcolor: 'background.default',
          borderRadius: 5,
          fontSize: { xs: 16, md: 15 },
        }}
      />
      <Fab type='submit' size='medium' color='primary' disabled={!canSend} aria-label={t.chat.send}>
        {sending ? <CircularProgress size={20} color='inherit' /> : <SendRounded />}
      </Fab>
    </Stack>
  );
};
