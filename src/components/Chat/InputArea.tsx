import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
}

const InputArea = ({ onSendMessage }: InputAreaProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textBeforeDictation = useRef('');
  const wasListening = useRef(false);
  
  const { isListening, startListening, stopListening } = useSpeechRecognition();

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        // Close keyboard on mobile
        textareaRef.current.blur();
      }
    }
  };

  useEffect(() => {
    // 移除自動發送邏輯，因為現在是手動停止模式，使用者可能還想編輯
    wasListening.current = isListening;
  }, [isListening]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      textBeforeDictation.current = input;
      startListening((transcript) => {
        setInput(textBeforeDictation.current + (textBeforeDictation.current ? ' ' : '') + transcript);
        adjustHeight();
      });
    }
  };

  return (
    <div className="p-6 border-t border-gray-100">
      <div className={`relative flex items-end rounded-[28px] border shadow-sm bg-white overflow-hidden transition-all ${
        isListening 
          ? 'border-purple-400 ring-4 ring-purple-100' 
          : 'border-gray-200 focus-within:ring-4 focus-within:ring-purple-100 focus-within:border-purple-300'
      }`}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "正在聆聽..." : "我是你的旅遊助理，來聊聊吧..."}
          rows={1}
          className="w-full pl-6 pr-14 py-4 text-gray-700 placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none text-lg resize-none max-h-[168px] overflow-y-auto"
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-1 pb-1 pr-1">
          {input.trim() && !isListening && (
            <button
              onClick={handleSend}
              className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors"
              aria-label="send message"
            >
              <Send size={24} />
            </button>
          )}
          <button
            onClick={toggleListening}
            className={`p-2 transition-colors rounded-full ${
              isListening 
                ? 'text-white bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
            aria-label={isListening ? "stop voice" : "start voice"}
          >
            {isListening ? <Square size={24} className="fill-current" /> : <Mic size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputArea;