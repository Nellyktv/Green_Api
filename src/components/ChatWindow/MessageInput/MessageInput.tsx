import { useState, type KeyboardEvent, type SubmitEvent } from 'react';
import { CircularProgress, Fab, InputBase, Stack } from '@mui/material';
import SendRounded from '@mui/icons-material/SendRounded';
import { useTranslation } from '../../../hooks/useTranslation';
import { formSx, inputSx } from './messageInputStyles';

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
      sx={formSx}
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
        sx={inputSx}
      />
      <Fab type='submit' size='medium' color='primary' disabled={!canSend} aria-label={t.chat.send}>
        {sending ? <CircularProgress size={20} color='inherit' /> : <SendRounded />}
      </Fab>
    </Stack>
  );
};
