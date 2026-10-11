import { useState, type SubmitEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useCreateChat } from '../../hooks/useCreateChat';
import { useTranslation } from '../../hooks/useTranslation';
import type { Credentials } from '../../types';

interface Props {
  open: boolean;
  credentials: Credentials;
  onClose: () => void;
}

export const NewChatDialog = ({ open, credentials, onClose }: Props) => {
  const [value, setValue] = useState('');
  const { createChat, loading, error, resetError } = useCreateChat(credentials);
  const t = useTranslation();

  const handleClose = () => {
    setValue('');
    resetError();
    onClose();
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const created = await createChat(value);
    if (created) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t.newChat.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label={t.newChat.label}
            placeholder='+375 29 123-45-67'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={Boolean(error)}
            helperText={error || t.newChat.hint}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t.newChat.cancel}</Button>
          <Button type='submit' variant='contained' loading={loading} disabled={!value.trim()}>
            {t.newChat.submit}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
