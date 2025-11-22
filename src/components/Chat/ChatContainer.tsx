import MessageBubble from './MessageBubble';
import InputArea from './InputArea';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContainer = ({ messages, isTyping, onSendMessage }: ChatContainerProps) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end z-20 px-4 pb-6 md:pb-10">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-7xl h-[60vh] flex flex-col">
        
        {/* 訊息區域 */}
        <div className="flex-1 px-8 py-6 overflow-y-auto chat-scroll">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="mb-8 flex justify-start">
              <div className="px-8 py-5 rounded-[32px] rounded-tl-none">
                <img src="/Thinking....gif" alt="Thinking..." className="h-8" />
              </div>
            </div>
          )}
        </div>

        {/* 輸入區域 */}
        <InputArea onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;