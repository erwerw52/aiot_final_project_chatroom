interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={`mb-8 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-8 py-5 break-words shadow-sm whitespace-pre-wrap text-lg leading-relaxed ${
          message.isUser
            ? 'bg-[#8B5CF6] text-white rounded-[32px] max-w-xl'
            : 'bg-[#E5E5E5] text-gray-900 rounded-[32px] max-w-3xl'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;