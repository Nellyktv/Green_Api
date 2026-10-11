import AppTheme from './components/AppTheme/AppTheme';
import { ChatPage } from './components/ChatPage/ChatPage';
import { LoginPage } from './components/LoginPage/LoginPage';
import { useAuthStore } from './store/useAuthStore';

const App = () => {
  const credentials = useAuthStore((s) => s.credentials);

  return (
    <AppTheme>
      {credentials ? <ChatPage credentials={credentials} /> : <LoginPage />}
    </AppTheme>
  );
};

export default App;
