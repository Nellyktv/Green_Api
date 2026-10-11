import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { Alert, Button, Link, TextField } from '@mui/material';
import ChatBubbleRounded from '@mui/icons-material/ChatBubbleRounded';
import { useLogin } from '../../hooks/useLogin';
import { useTranslation } from '../../hooks/useTranslation';
import type { Credentials } from '../../types';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { CONSOLE_URL, initialForm, loginFields } from './loginPageData';
import styles from './LoginPage.module.scss';

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
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <ChatBubbleRounded />
          </div>
          <div className={styles.brandText}>
            <div className={styles.title}>GREEN-API Chat</div>
            <div className={styles.subtitle}>{t.login.subtitle}</div>
          </div>
          <LanguageSwitch />
        </div>

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
            fullWidth
          />
        ))}

        {error && <Alert severity='error'>{error}</Alert>}

        <Button type='submit' variant='contained' size='large' loading={loading} disabled={!canSubmit}>
          {t.login.submit}
        </Button>

        <div className={styles.hint}>
          {t.login.consoleHint}{' '}
          <Link href={CONSOLE_URL} target='_blank' rel='noreferrer'>
            {t.login.consoleLink}
          </Link>
        </div>
      </form>
    </div>
  );
};
