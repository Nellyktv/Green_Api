import { useState, type ChangeEvent, type FocusEvent, type MouseEvent, type SubmitEvent } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
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
import { validateCredentials } from '../../lib/credentials';
import type { Credentials, Messenger } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { CONSOLE_URL, initialForm } from './loginPageData';
import {
  advancedFieldSx,
  avatarSx,
  cardSx,
  fullWidthSx,
  headerSx,
  hintSx,
  languageSwitchSx,
  pageSx,
  topRightSx,
} from './loginPageStyles';

type TextFieldName = 'idInstance' | 'apiTokenInstance' | 'apiUrl';

export const LoginPage = () => {
  const [form, setForm] = useState<Credentials>(initialForm);
  const [showToken, setShowToken] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const { submit, loading, error } = useLogin();
  const t = useTranslation();

  const [touched, setTouched] = useState<Partial<Record<keyof Credentials, boolean>>>({});

  const errors = validateCredentials(form);
  const canSubmit = Object.keys(errors).length === 0;
  // The field is hidden by default, so an invalid apiUrl must open it
  const advancedShown = advancedOpen || Boolean(errors.apiUrl);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMessengerChange = (_e: MouseEvent<HTMLElement>, messenger: Messenger | null) => {
    if (messenger) setForm({ ...form, messenger });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // An error is shown only after the user has left the field
  const fieldProps = (name: TextFieldName) => {
    const code = touched[name] ? errors[name] : undefined;
    return {
      name,
      label: name,
      value: form[name],
      onChange: handleChange,
      onBlur: handleBlur,
      error: Boolean(code),
      helperText: code && t.login.errors[code],
      autoComplete: 'off',
    };
  };

  const apiUrlProps = fieldProps('apiUrl');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    // A failed attempt may be caused by apiUrl, so show it
    if (!(await submit(form))) setAdvancedOpen(true);
  };

  return (
    <Box sx={pageSx}>
      <Paper
        component='form'
        elevation={0}
        onSubmit={handleSubmit}
        sx={cardSx}
      >
        <Box sx={languageSwitchSx}>
          <LanguageSwitch />
        </Box>
        <Box sx={topRightSx}>
          <ThemeToggle />
          <IconButton aria-label={t.login.help} href={CONSOLE_URL} target='_blank' rel='noreferrer'>
            <HelpOutlineRounded />
          </IconButton>
        </Box>

        <Stack sx={headerSx}>
          <Avatar variant='rounded' sx={avatarSx}>
            <ChatBubbleRounded fontSize='large' />
          </Avatar>
          <Typography variant='h6'>{t.login.title}</Typography>
          <Typography variant='caption'>GREEN-API Chat</Typography>
          <Typography variant='caption'>{t.login.subtitle}</Typography>
        </Stack>

        <ToggleButtonGroup
          exclusive
          fullWidth
          size='small'
          color='primary'
          value={form.messenger}
          onChange={handleMessengerChange}
          aria-label={t.login.messenger}
        >
          <ToggleButton value='telegram'>Telegram</ToggleButton>
          <ToggleButton value='whatsapp'>WhatsApp</ToggleButton>
        </ToggleButtonGroup>
        <TextField {...fieldProps('idInstance')} />
        <TextField
          {...fieldProps('apiTokenInstance')}
          type={showToken ? 'text' : 'password'}
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

        <Box sx={fullWidthSx}>
          <Button
            size='small'
            aria-expanded={advancedShown}
            endIcon={advancedShown ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            onClick={() => setAdvancedOpen(!advancedOpen)}
          >
            {t.login.advanced}
          </Button>
          <Collapse in={advancedShown}>
            <Box sx={advancedFieldSx}>
              <TextField {...apiUrlProps} helperText={apiUrlProps.helperText || t.login.hints.apiUrl} />
            </Box>
          </Collapse>
        </Box>

        {error && <Alert severity='error' sx={fullWidthSx}>{error}</Alert>}

        <Button
          type='submit'
          variant='contained'
          size='large'
          loading={loading}
          disabled={!canSubmit}
          sx={fullWidthSx}
        >
          {t.login.submit}
        </Button>

        <Typography variant='caption' sx={hintSx}>
          {t.login.consoleHint}{' '}
          <Link href={CONSOLE_URL} target='_blank' rel='noreferrer'>
            {t.login.consoleLink}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};
