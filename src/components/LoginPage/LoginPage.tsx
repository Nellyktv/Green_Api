import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { Alert, Avatar, Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import ChatBubbleRounded from '@mui/icons-material/ChatBubbleRounded';
import { useLogin } from '../../hooks/useLogin';
import { useTranslation } from '../../hooks/useTranslation';
import { chat } from '../../theme';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { CONSOLE_URL, initialForm, loginFields } from './loginPageData';

export const LoginPage = () => {
  const [form, setForm] = useState<Credentials>(initialForm);
  const { submit, loading, error } = useLogin();
  const t = useTranslation();

  const canSubmit = loginFields.every((el) => form[el.name].trim() !== '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submit(form);
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'center',
        p: { xs: 0, md: 2 },
        bgcolor: { xs: 'background.paper', md: 'background.default' },
      }}
    >
      <Paper
        component='form'
        variant='outlined'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: { md: 420 },
          p: { xs: '24px 16px', md: '32px 28px' },
          borderWidth: { xs: 0, md: 1 },
          borderRadius: { xs: 0, md: 2 },
        }}
      >
        <Stack direction='row' sx={{ alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Avatar variant='rounded' sx={{ width: 48, height: 48, background: chat.accentGradient }}>
            <ChatBubbleRounded />
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant='h6'>GREEN-API Chat</Typography>
            <Typography variant='caption'>
              {t.login.subtitle}
            </Typography>
          </Box>
          <LanguageSwitch />
        </Stack>

        {loginFields.map((el) => (
          <TextField
            key={el.name}
            name={el.name}
            label={el.name}
            type={el.type}
            helperText={t.login.hints[el.name]}
            value={form[el.name]}
            onChange={handleChange}
            autoComplete='off'
          />
        ))}

        {error && <Alert severity='error'>{error}</Alert>}

        <Button type='submit' variant='contained' size='large' loading={loading} disabled={!canSubmit}>
          {t.login.submit}
        </Button>

        <Typography variant='caption' sx={{ textAlign: 'center' }}>
          {t.login.consoleHint}{' '}
          <Link href={CONSOLE_URL} target='_blank' rel='noreferrer'>
            {t.login.consoleLink}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
