import { useState, useRef, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const silenceTimerRef = useRef<number | null>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (silenceTimerRef.current) {
      window.clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback((onResult: (transcript: string) => void) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('您的瀏覽器不支援語音辨識。');
      return;
    }

    // 如果正在監聽，則先停止
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-TW';

    const resetSilenceTimer = () => {
      if (silenceTimerRef.current) {
        window.clearTimeout(silenceTimerRef.current);
      }
      // 2秒無聲自動停止
      silenceTimerRef.current = window.setTimeout(() => {
        recognition.stop();
      }, 2000);
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetSilenceTimer();
    };

    recognition.onresult = (event) => {
      resetSilenceTimer();
      
      // 取得目前為止的所有辨識結果
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      onResult(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (silenceTimerRef.current) {
        window.clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      console.error('語音辨識錯誤:', event.error);
      stopListening();
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
};