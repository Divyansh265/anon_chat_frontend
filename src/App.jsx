import { useChat } from './context/ChatContext';
import Home from './pages/Home';
import Chat from './pages/Chat';

export default function App() {
    const { state } = useChat();

    const showChat = state.status !== 'idle';

    return showChat ? <Chat /> : <Home />;
}
