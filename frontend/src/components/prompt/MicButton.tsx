import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { getSpeechRecognitionConstructor } from '../../lib/speechRecognition';
import { IconMic } from './PromptIcons';
import type { PromptBoxStyles } from './types';

type MicButtonProps = {
  styles: PromptBoxStyles;
  onFinalTranscript: (text: string) => void;
  /** Called when speech recognition fails or is unavailable. */
  onError?: (message: string) => void;
};

export function MicButton({ styles, onFinalTranscript, onError }: MicButtonProps) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognition | null>(null);
  const supported = getSpeechRecognitionConstructor() !== null;

  const stop = useCallback(() => {
    const rec = recRef.current;
    if (!rec) return;
    try {
      rec.stop();
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    return () => {
      stop();
      recRef.current = null;
    };
  }, [stop]);

  const start = useCallback(() => {
    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) {
      onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    const prev = recRef.current;
    if (prev) {
      try {
        prev.abort();
      } catch {
        /* ignore */
      }
      recRef.current = null;
    }

    const rec = new Ctor();
    rec.lang = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US';
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result.isFinal) continue;
        const text = result[0]?.transcript?.trim();
        if (text) onFinalTranscript(text);
      }
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        onError?.('Microphone permission denied.');
      } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
        onError?.(event.message || event.error);
      }
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
      recRef.current = null;
    };

    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      onError?.('Could not start speech recognition.');
      setListening(false);
    }
  }, [onError, onFinalTranscript]);

  function toggle() {
    if (!supported) return;
    if (listening) {
      stop();
      recRef.current = null;
      setListening(false);
      return;
    }
    start();
  }

  return (
    <button
      type="button"
      className={cn(styles.micButton, listening && styles.micButtonListening)}
      onClick={toggle}
      disabled={!supported}
      aria-pressed={listening}
      title={supported ? (listening ? 'Stop dictation' : 'Dictate with microphone') : 'Speech recognition not supported'}
    >
      <IconMic title={listening ? 'Stop dictation' : 'Dictate'} />
    </button>
  );
}
