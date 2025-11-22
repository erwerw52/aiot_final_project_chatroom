import BackgroundSlider from './components/BackgroundSlider';
import Header from './components/Header';
import ChatContainer from './components/Chat/ChatContainer';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isTyping, sendMessage } = useChat();

  return (
    <div className="fixed inset-0 overflow-hidden">
      <BackgroundSlider />
      <Header />
      <ChatContainer messages={messages} isTyping={isTyping} onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
