import BackgroundSlider from './components/BackgroundSlider';
import Header from './components/Header';
import ChatContainer from './components/Chat/ChatContainer';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, sendMessage } = useChat();

  return (
    <div className="relative min-h-screen">
      <BackgroundSlider />
      <Header />
      <ChatContainer messages={messages} onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
