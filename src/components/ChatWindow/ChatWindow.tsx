import { Alert, Snackbar, Stack } from '@mui/material';
import { useChatHistory } from '../../hooks/useChatHistory';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useChatStore } from '../../store/useChatStore';
import type { Chat, Credentials } from '../../types';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { MessageList } from './MessageList/MessageList';
import { MessageInput } from './MessageInput/MessageInput';

interface Props {
  chat: Chat;
  credentials: Credentials;
  onBack?: () => void;
}

export const ChatWindow = ({ chat, credentials, onBack }: Props) => {
  const messages = useChatStore((s) => s.messages[chat.chatId]);
  const historyLoading = useChatHistory(credentials, chat.chatId);
  const { send, error, resetError } = useSendMessage(credentials, chat.chatId);

  return (
    <Stack component='section' sx={{ flex: 1, minHeight: 0 }}>
      <ChatHeader chat={chat} onBack={onBack} />
      <MessageList messages={messages ?? []} loading={historyLoading} />
      <MessageInput onSend={send} />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={resetError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' variant='filled' onClose={resetError}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
