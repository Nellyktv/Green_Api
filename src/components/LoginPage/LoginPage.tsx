import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ChatBubbleRounded from '@mui/icons-material/ChatBubbleRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import VisibilityOffRounded from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import { useLogin } from '../../hooks/useLogin';
import { useTranslation } from '../../hooks/useTranslation';
import { chat } from '../../theme';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { CONSOLE_URL, initialForm } from './loginPageData';

export const LoginPage = () => {
  const [form, setForm] = useState<Credentials>(initialForm);
  const [showToken, setShowToken] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const { submit, loading, error } = useLogin();
  const t = useTranslation();

  const canSubmit = Object.values(form).every((value) => value.trim() !== '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // A failed attempt may be caused by apiUrl, so show it
    if (!(await submit(form))) setAdvancedOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'center',
        p: { xs: 0, md: 2 },
        bgcolor: 'background.paper',
        background: { md: chat.loginBackdrop },
      }}
    >
      <Paper
        component='form'
        elevation={0}
        onSubmit={handleSubmit}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: { md: 420 },
          p: { xs: '24px 16px', md: '32px 28px' },
          bgcolor: { xs: 'background.paper', md: chat.loginCard },
          backdropFilter: { md: 'blur(16px)' },
          boxShadow: { xs: 'none', md: chat.loginCardShadow },
          borderRadius: { xs: 0, md: '28px' },
        }}
      >
        <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
          <LanguageSwitch />
        </Box>
        <IconButton
          aria-label={t.login.help}
          href={CONSOLE_URL}
          target='_blank'
          rel='noreferrer'
          sx={{ position: 'absolute', top: 12, right: 12 }}
        >
          <HelpOutlineRounded />
        </IconButton>

        <Stack sx={{ alignItems: 'center', gap: 0.5, mt: 4, mb: 1, textAlign: 'center' }}>
          <Avatar variant='rounded' sx={{ width: 64, height: 64, mb: 1, background: chat.accentGradient }}>
            <ChatBubbleRounded fontSize='large' />
          </Avatar>
          <Typography variant='h6'>{t.login.title}</Typography>
          <Typography variant='caption'>GREEN-API Chat</Typography>
          <Typography variant='caption'>{t.login.subtitle}</Typography>
        </Stack>

        <TextField
          name='idInstance'
          label='idInstance'
          value={form.idInstance}
          onChange={handleChange}
          autoComplete='off'
        />
        <TextField
          name='apiTokenInstance'
          label='apiTokenInstance'
          type={showToken ? 'text' : 'password'}
          value={form.apiTokenInstance}
          onChange={handleChange}
          autoComplete='off'
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    aria-label={showToken ? t.login.hideToken : t.login.showToken}
                    onClick={() => setShowToken(!showToken)}
                  >
                    {showToken ? <VisibilityOffRounded /> : <VisibilityRounded />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ width: '100%' }}>
          <Button
            size='small'
            aria-expanded={advancedOpen}
            endIcon={advancedOpen ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            onClick={() => setAdvancedOpen(!advancedOpen)}
          >
            {t.login.advanced}
          </Button>
          <Collapse in={advancedOpen}>
            <Box sx={{ pt: 1 }}>
              <TextField
                name='apiUrl'
                label='apiUrl'
                helperText={t.login.hints.apiUrl}
                value={form.apiUrl}
                onChange={handleChange}
                autoComplete='off'
              />
            </Box>
          </Collapse>
        </Box>

        {error && <Alert severity='error' sx={{ width: '100%' }}>{error}</Alert>}

        <Button
          type='submit'
          variant='contained'
          size='large'
          loading={loading}
          disabled={!canSubmit}
          sx={{ width: '100%' }}
        >
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
