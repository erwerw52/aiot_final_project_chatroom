import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
   
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Mock API call
    setTimeout(() => {
      setIsTyping(false);
      const fullText = `您說：${text}。這是模擬回應。`;
      const botMessageId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          text: '',
          isUser: false,
        },
      ]);

      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, text: fullText.slice(0, charIndex + 1) }
                : msg
            )
          );
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    }, 3000);
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
};