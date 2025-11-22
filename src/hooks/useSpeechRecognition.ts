import { useState, useRef, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const watchdogTimerRef = useRef<number | null>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (watchdogTimerRef.current) {
      window.clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback((onResult: (transcript: string) => void) => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('您的瀏覽器不支援語音辨識。');
      return;
    }

    // 如果正在監聽，則執行停止（Toggle 行為）
    if (isListening) {
      stopListening();
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-TW';

    // 防呆機制：只有在極長時間（例如 10 秒）完全沒聲音才自動停，避免忘記關
    const resetWatchdog = () => {
      if (watchdogTimerRef.current) {
        window.clearTimeout(watchdogTimerRef.current);
      }
      watchdogTimerRef.current = window.setTimeout(() => {
        recognition.stop();
      }, 10000); // 10秒無聲才停
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetWatchdog();
    };

    recognition.onresult = (event) => {
      resetWatchdog();
      
      // 取得目前為止的所有辨識結果
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      onResult(currentTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (watchdogTimerRef.current) {
        window.clearTimeout(watchdogTimerRef.current);
        watchdogTimerRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      console.error('語音辨識錯誤:', event.error);
      // 忽略 'no-speech' 錯誤，因為在手動模式下這很常見
      if (event.error !== 'no-speech') {
        stopListening();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening, stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
};